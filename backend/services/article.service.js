const { ControlledContainerMixin } = require('@semapps/ldp');

module.exports = {
  name: 'article',
  mixins: [ControlledContainerMixin],
  settings: {
    // path: '/taxonomy',
    permissions: {
      anon: {
        read: true,
        write: true,
      },
      anyUser: {
        read: true,
        write: true,
      }
    },
    acceptedTypes: ['as:Article']
  },

}