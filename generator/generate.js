const { ServiceBroker } = require('moleculer');
const CONFIG = require('./config');
const RdfJSONSerializer = require('./RdfJSONSerializer.js');

//Data to import
const actorData = {
  username: 'etienne',
  email: 'etienne@test.com',
  password: 'test',
  name: 'Etienne',
  'schema:knowsLanguage': 'en'
};

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

// find in tests/pods-creation.test.js
//https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
  podProvider = await connectPodProvider();
  //Create the profil
  const { webId } = await podProvider.call('auth.signup', actorData);
  console.log(webId);
  const actor = await podProvider.call(
    'activitypub.actor.awaitCreateComplete',
    {
      actorUri: webId,
      additionalKeys: ['url'],
      maxTries: 30
    },
    { meta: { dataset: actorData.username } }
  );
  console.log(actor);
  return actor;
})();

