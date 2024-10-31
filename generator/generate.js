const { ServiceBroker } = require('moleculer');
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

// find in tests/pods-creation.test.js
//https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
  const NUM_PODS = 4;
  podProvider = await connectPodProvider();
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
    console.log(actors[i]);

  }
  return actors;
})();
