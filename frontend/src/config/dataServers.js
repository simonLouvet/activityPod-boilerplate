const dataServers = {
  pod: {
    pod: true,
    authServer: true,
    default: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null,
    containers: {
      pod: {
        'vcard:Individual': ['/vcard/individual'],
        'as:Event': ['/as/event'],
        'as:Article': ['/as/article']
      }
    },
    uploadsContainer: '/semapps/file'
  },
  app: {
    baseUrl: 'http://localhost:3001',
    sparqlEndpoint: 'http://localhost:3001/sparql',
    containers: {
      app: {
        'skos:Concept': ['/skos/concept'],
        'as:Article': ['/as/article']
      }
    }
  }
};

export default dataServers;
