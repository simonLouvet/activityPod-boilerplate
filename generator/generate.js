const { ACTIVITY_TYPES } = require('@semapps/activitypub');
const { ServiceBroker } = require('moleculer');
const Redis = require('ioredis');
const CONFIG = require('./config');
const RdfJSONSerializer = require('./RdfJSONSerializer.js');
const NUM_PODS = 2;

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

const deleteDataset = async (podprovider,dataset) => {
  await podprovider.call('triplestore.dataset.delete', {
    dataset,
    iKnowWhatImDoing: true
  })
};

// const clearDataset = async dataset => {
//   const response = await fetch(`${CONFIG.SPARQL_ENDPOINT + dataset}/update`, {
//     method: 'POST',
//     body: 'update=CLEAR+ALL', // DROP+ALL is not working with WebACL datasets !
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${Buffer.from(`${CONFIG.JENA_USER}:${CONFIG.JENA_PASSWORD}`).toString('base64')}`
//     }
//   });
//   return response;
// };

const clearRedisDb = async redisUrl => {
  const redisClient = new Redis(redisUrl);
  await redisClient.flushdb();
  redisClient.disconnect();
};

// const clearAllData = async () => {
//   try {
//     const datasets = await listDatasets();
//     console.log('Datasets trouvés:', datasets);

//     for (let dataset of datasets) {
//       const response = await clearDataset(dataset);
//       if (!response.ok) {
//         const text = await response.text();
//         console.error(`Erreur lors du nettoyage du dataset ${dataset}:`, text);
//       } else {
//         console.log("Ce jeu a été supprimé : ", dataset)
//         console.log("La réponse était : ", response)
//       }
//     }

//     await clearRedisDb(CONFIG.QUEUE_SERVICE_URL);
//     await clearRedisDb(CONFIG.REDIS_OIDC_PROVIDER_URL);

//     await clearMails();
//     console.log('Nettoyage terminé');
//   } catch (error) {
//     console.error('Erreur lors du nettoyage:', error);
//   }
// };

const clearAllData = async (podProvider) => {
  try {
    const nickID = 'http://localhost:3000/anastasia3'
    const nick = await podProvider.call('auth.account.findByWebId', {webId: nickID})

    nick.call = (actionName, params, options = {}) =>
      podProvider.call(actionName, params, {
        ...options,
        meta: { ...options.meta, webId: "system", dataset: "anastasia3" }
      });

      const res = await nick.call('auth.login', {username: "anastasia3", password: "test" })
    
      nick.token = res.token
      console.log("nick", nick)

      const response = await nick.call("management.deleteActor", {
            actorUri: nickID,
            iKnowWhatImDoing: true
          }
        )
        console.log("response", response)

    // const datasets = await listDatasets();
    // console.log('Datasets trouvés:', datasets);

// TRY TO LOG AS SYSTEM
  //   const system = await podProvider.call('auth.account.findByWebId', {webId: 'system'})
  //   console.log("sysem", system)

  //   system.call = (actionName, params, options = {}) =>
  //     podProvider.call(actionName, params, {
  //       ...options,
  //       meta: { ...options.meta, system, dataset: system.preferredUsername }
  //     });


  //   const response = await system.call("management.deleteActor", {
  //     webId: 'system',
  //     actorUri: "http://localhost:3000/nick2",
  //     iKnowWhatImDoing: true
  //   }
  // )
  // console.log("response", response)


  // TRY YO LOG AS USER
  //     const system = await podProvider.call('auth.account.findByWebId', {webId: 'system'})
  //   console.log("sysem", system)

  //   system.call = (actionName, params, options = {}) =>
  //     podProvider.call(actionName, params, {
  //       ...options,
  //       meta: { ...options.meta, system, dataset: system.preferredUsername }
  //     });


  //   const response = await system.call("management.deleteActor", {
  //     webId: 'system',
  //     actorUri: "http://localhost:3000/nick2",
  //     iKnowWhatImDoing: true
  //   }
  // )
  // console.log("response", response)

    // for (let dataset of datasets) {
    //   await podProvider.call("management.deleteActor",   )
    // }


    // for (let dataset of datasets) {
    //   const response = await clearDataset(dataset);
    //   if (!response.ok) {
    //     const text = await response.text();
    //     console.error(`Erreur lors du nettoyage du dataset ${dataset}:`, text);
    //   } else {
    //     console.log("Ce jeu a été supprimé : ", dataset)
    //     console.log("La réponse était : ", response)
    //   }
    // }

    await clearRedisDb(CONFIG.QUEUE_SERVICE_URL);
    await clearRedisDb(CONFIG.REDIS_OIDC_PROVIDER_URL);

    await clearMails();
    console.log('Nettoyage terminé');
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
  }
};

//TODO : ouvrir issue  : efface config mais pas la database
//https://github.com/assemblee-virtuelle/semapps/blob/master/src/middleware/packages/triplestore/subservices/dataset.js#L118
// const clearAllData = async (provider) => {
//   try {
//     const datasets = await listDatasets();
//     console.log('Datasets trouvés:', datasets);

//     for (let dataset of datasets) {
//       try {
//         await deleteDataset(provider, dataset);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     await clearRedisDb(CONFIG.QUEUE_SERVICE_URL);
//     await clearRedisDb(CONFIG.REDIS_OIDC_PROVIDER_URL);
//     await clearMails();

//     console.log('Nettoyage terminé');
//   } catch (error) {
//     console.error('Erreur lors du nettoyage:', error);
//   }
// };

// find in tests/pods-creation.test.js
async function createPods(podProvider) {
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
    // use podprovide authentified as actors[i]
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
}

//https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
  let actors = []
  const podProvider = await connectPodProvider();
  await clearAllData(podProvider);
  // actors = await createPods(podProvider);
  return actors;
})();
