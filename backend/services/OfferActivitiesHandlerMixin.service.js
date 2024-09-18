const { PodActivitiesHandlerMixin } = require('@activitypods/app');

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
        // const inserted = await ctx.call('ldp.resource.post', {
        //   resource: activity.object,
        // })
        try {
          const resourceUri = await ctx.call('ldp.container.post', {
            containerUri: 'http://localhost:3001/as/article',
            slug: 'test',
            resource: activity.object,
            contentType: 'application/ld+json'
          });
          console.log(`Inserted ${resourceUri}`)
        } catch (error) {
          console.log(error)
        }
      },
      async onReceive(ctx, activity, actorUri) {
        console.log(`RECEIVE update Article ${activity.object.name}!`);
      }
    }
  }
};