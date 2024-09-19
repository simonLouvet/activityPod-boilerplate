import { Paper, Chip, Typography, Box } from '@mui/material';
import { DateTime } from 'luxon';

const OfferCard = props => {
  const { offer, tags, Actions = null } = props;
  const tag = tags?.find(tag => tag.id === offer['as:tag'])?.['skos:prefLabel'];
  const datetime = offer['dc:created'] ? DateTime.fromISO(offer['dc:created']) : '';

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{offer.name}</Typography>
        <Chip color="primary" label={tag} />
      </Box>
      <Typography>
        <strong>Créée par </strong>
        {offer['dc:creator']}
      </Typography>
      <Typography>
        <strong>Le </strong>
        {datetime?.toLocaleString(DateTime.DATETIME_SHORT)}
      </Typography>
      {Actions && <Actions />}
    </Paper>
  );
};
export default OfferCard;
