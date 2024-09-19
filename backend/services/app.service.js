const urlJoin = require('url-join');
const { AppService } = require('@activitypods/app');
const CONFIG = require('../config/config');

// For documentation, see: https://docs.activitypods.org/app-framework/backend/application-registration/
module.exports = {
  mixins: [AppService],
  settings: {
    app: {
      name: CONFIG.APP_NAME,
      description: CONFIG.APP_DESCRIPTION,
      thumbnail: urlJoin(CONFIG.FRONT_URL, 'logo192.png'),
      frontUrl: CONFIG.FRONT_URL
    },
    oidc: {
      clientUri: CONFIG.FRONT_URL,
      redirectUris: urlJoin(CONFIG.FRONT_URL, 'auth-callback'),
      postLogoutRedirectUris: urlJoin(CONFIG.FRONT_URL, 'login?logout=true'),
      tosUri: null
    },
    accessNeeds: {
      required: [
        {
          registeredClass: 'as:Event',
          accessMode: ['acl:Read', 'acl:Write']
        },
        {
          registeredClass: 'as:Article',
          accessMode: ['acl:Read', 'acl:Write','acl:Control']
        },
        {
          registeredClass: 'vcard:Individual',
          accessMode: 'acl:Read'
        },
        'apods:ReadInbox',
        'apods:ReadOutbox',
        'apods:PostOutbox',
        'apods:QuerySparqlEndpoint',
        'apods:CreateWacGroup',
        'apods:CreateCollection',
        'apods:UpdateWebId'
      ],
      optional: []
    },
    classDescriptions: {
      'as:Event': {
        label: {
          en: 'Events',
          fr: 'Événements'
        },
        labelPredicate: 'as:name',
        openEndpoint: urlJoin(CONFIG.FRONT_URL, '/r')
      },
      'vcard:Individual': {
        label: {
          en: 'Profiles',
          fr: 'Profils'
        },
        labelPredicate: 'vcard:given-name',
        openEndpoint: urlJoin(CONFIG.FRONT_URL, '/r')
      },
      'as:Article': {
        label: {
          en: 'Offers',
          fr: 'Offres'
        },
        labelPredicate: 'as:name',
        openEndpoint: urlJoin(CONFIG.FRONT_URL, '/r')
      }
    },
    queueServiceUrl: CONFIG.QUEUE_SERVICE_URL
  }
};
