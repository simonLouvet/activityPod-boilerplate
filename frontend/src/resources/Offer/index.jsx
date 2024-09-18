import OfferCreate from './OfferCreate';
import OfferEdit from './OfferEdit';
import OfferList from './OfferList';
import OfferShow from './OfferShow';
import OfferIcon from '@mui/icons-material/Event';

export default {
  config: {
    list: OfferList,
    show: OfferShow,
    create: OfferCreate,
    edit: OfferEdit,
    icon: OfferIcon,
  },
  dataModel: {
    types: ['as:Article']
  },
  translations: {
    en: {
      name: 'Offer |||| Offers',
      fields: {
        'dc:created': 'creation date',
        'as:tag': 'topic',
        'name': 'title'
      }
    },
    fr: {
      name: 'Offre |||| Offres',
      fields: {
        'dc:created': "date de création",
        'as:tag': 'theme',
        'name': 'titre'
      }
    }
  }
};
