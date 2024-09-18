const { ControlledContainerMixin } = require('@semapps/ldp');

module.exports = {
  name: 'taxons',
  mixins: [ControlledContainerMixin],
  settings: {
    acceptedTypes: ['skos:Concept']
  },
  permissions: {
    anon: {
      read: true,
      write: false,
    },
    anyUser: {
      read: true,
      write: true,
    }
  }
}