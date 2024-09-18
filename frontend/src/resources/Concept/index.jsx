import ConceptCreate from './ConceptCreate';
import ConceptEdit from './ConceptEdit';
import ConceptList from './ConceptList';
import ConceptShow from './ConceptShow';
import ConceptIcon from '@mui/icons-material/Event';

export default {
  config: {
    list: ConceptList,
    show: ConceptShow,
    create: ConceptCreate,
    edit: ConceptEdit,
    icon: ConceptIcon,
  },
  dataModel: {
    types: ['skos:Concept'],
    create:{
      server: 'app',
    },
    list: {
      fetchContainer: true,
    }
  },
  translations: {
    en: {
      name: 'Concept |||| Concepts',
      fields: {
        'dc:created': 'creation date',
        'skos:prefLabel' : "Label"
      }
    },
    fr: {
      name: 'Concepte |||| Conceptes',
      fields: {
        'dc:created': "Date de création",
        'skos:prefLabel' : "Libellé"
      }
    }
  }
};
