const { ACTIVITY_TYPES } = require('@semapps/activitypub');
const { ServiceBroker } = require('moleculer');
const Redis = require('ioredis');
const CONFIG = require('./config');
const RdfJSONSerializer = require('./RdfJSONSerializer.js');

// Create a ServiceBroker
//find in activitypods/tests/initialize.js
const connectPodProvider = async () => {
  // Connect to the Pod provider broker with a Redis transporter
  const broker = new ServiceBroker({
    nodeID: `test-node`,
    transporter: CONFIG.REDIS_TRANSPORTER_URL,
    serializer: new RdfJSONSerializer(),
    logger: {
      type: 'Console',
      options: {
        formatter: 'short',
        level: 'info'
      }
    }
  });

  await broker.start();

  // If the service is available, it means we are connected to the Pod provider broker
  await broker.waitForServices(['ldp']);

  return broker;
};

const listDatasets = async () => {
  const response = await fetch(`${CONFIG.SPARQL_ENDPOINT}$/datasets`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${CONFIG.JENA_USER}:${CONFIG.JENA_PASSWORD}`).toString('base64')}`
    }
  });

  if (response.ok) {
    const json = await response.json();
    return json.datasets.map(dataset => dataset['ds.name'].substring(1));
  }
  return [];
};

const clearMails = async () => {
  await fetch(CONFIG.MAILCATCHER_API_URL, {
    method: 'DELETE'
  });
};

const clearDataset = async dataset => {
  const response = await fetch(`${CONFIG.SPARQL_ENDPOINT + dataset}/update`, {
    method: 'POST',
    body: 'update=CLEAR+ALL', // DROP+ALL is not working with WebACL datasets !
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CONFIG.JENA_USER}:${CONFIG.JENA_PASSWORD}`).toString('base64')}`
    }
  });
  return response;
};

const clearRedisDb = async redisUrl => {
  const redisClient = new Redis(redisUrl);
  await redisClient.flushdb();
  redisClient.disconnect();
};

const clearAllData = async () => {
  try {
    const datasets = await listDatasets();
    console.log('Datasets trouvés:', datasets);

    for (let dataset of datasets) {
      const response = await clearDataset(dataset);
      if (!response.ok) {
        const text = await response.text();
        console.error(`Erreur lors du nettoyage du dataset ${dataset}:`, text);
      } else {
        console.log("Ce jeu a été supprimé : ", dataset)
        console.log("La réponse était : ", response)
      }
    }

    await clearRedisDb(CONFIG.QUEUE_SERVICE_URL);
    await clearRedisDb(CONFIG.REDIS_OIDC_PROVIDER_URL);

    await clearMails();
    console.log('Nettoyage terminé');
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
  }
};

// find in tests/pods-creation.test.js
//https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
  await clearAllData();
  const NUM_PODS = 2;
  const podProvider = await connectPodProvider();
  const actors = [];
  for (let i = 1; i <= NUM_PODS; i++) {
    const actorData = require(`./data/actor${i}.json`);
    const { webId } = await podProvider.call('auth.signup', actorData);

    actors[i] = await podProvider.call(
      'activitypub.actor.awaitCreateComplete',
      {
        actorUri: webId,
        additionalKeys: ['url'],
        maxTries: 30
      },
      { meta: { dataset: actorData.username } }
    );
    // Is it really usefull ?
    actors[i].call = (actionName, params, options = {}) =>
      podProvider.call(actionName, params, {
        ...options,
        meta: { ...options.meta, webId, dataset: actors[i].preferredUsername }
      });
    // console.log(actors[i]);
  }

  const nick = actors[1];
  const anastasia = actors[2];

  const contactRequestToAnastasia = await nick.call('activitypub.outbox.post', {
    collectionUri: nick.outbox,
    type: ACTIVITY_TYPES.OFFER,
    actor: nick.id,
    object: {
      type: ACTIVITY_TYPES.ADD,
      object: nick.url
    },
    content: 'Hey Anastasia, do you remember me ?',
    target: anastasia.id,
    to: anastasia.id
  });

  const contactRequestAcceptedByAnastasia = await anastasia.call('activitypub.outbox.post', {
    collectionUri: anastasia.outbox,
    type: ACTIVITY_TYPES.ACCEPT,
    actor: anastasia.id,
    object: contactRequestToAnastasia.id,
    to: nick.id
  });

  console.log('contactRequestToAnastasia', contactRequestToAnastasia);
  console.log('contactRequestAcceptedByAnastasia', contactRequestAcceptedByAnastasia);
  return actors;
})();
