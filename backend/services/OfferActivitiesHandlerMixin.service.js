const { PodActivitiesHandlerMixin } = require('@activitypods/app');
// const { triple, namedNode } = require('@rdfjs/data-model');
const { triple, namedNode } = require('@rdfjs/data-model');
// const dataFactory = require("fix-esm").require('@rdfjs/data-model')


async function handleEmit(ctx, activity, actorUri) {
  try {
    console.log('CREATE ou UPDATE activity',activity)
    if (activity.object['as:published']){
      await ctx.call('pod-permissions.add', {
        uri: activity.object.id,
        agentUri: 'http://xmlns.com/foaf/0.1/Agent',
        agentPredicate: 'acl:agentClass',
        mode: 'acl:Read',
        actorUri: actorUri
      });

      const containsTriple = triple(
        namedNode('http://localhost:3001/as/article'),
        namedNode('http://www.w3.org/ns/ldp#contains'),
        namedNode(activity.object.id)
      );

      await ctx.call('ldp.container.patch', {
        containerUri: 'http://localhost:3001/as/article',
        triplesToAdd: [containsTriple]
      });

      console.log('-> Offer published')

    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  name: 'offerPublish',
  mixins: [PodActivitiesHandlerMixin],
  activities: {
    offerPublish: {
      match: {
        type: 'Update',
        object: {
          type: 'Article'
        }
      },
      async onEmit(ctx, activity, actorUri) {
        console.log(`EMIT update Article ${activity.object.name}!`);
        await handleEmit(ctx, activity, actorUri); // Appel de la nouvelle fonction
      },
    },
    offerCreatedPublished: {
      match: {
        type: 'Create',
        object: {
          type: 'Article'
        }
      },
      async onEmit(ctx, activity, actorUri) {
        console.log(`EMIT create Article ${activity.object.name}!`);
        await handleEmit(ctx, activity, actorUri); // Appel de la nouvelle fonction
      },
    },
  }
};