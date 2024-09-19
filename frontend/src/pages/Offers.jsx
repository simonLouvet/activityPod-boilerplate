import { useState } from 'react';
import { useGetList } from 'react-admin';
import { Grid, Box, TextField, Paper, Typography } from '@mui/material';
import OfferCard from '../components/OfferCard';
import { useMemo } from 'react';
import TagsSelector from '../components/TagsSelector';

const OffersPage = () => {
  const { data: offers = [] } = useGetList('Offer');
  const { data: tags = [] } = useGetList('Concept');

  console.log({ offers, tags });

  const [textFilter, setTextFilter] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredOffers = useMemo(
    () =>
      offers
        .filter(offer => offer.name?.toLowerCase().includes(textFilter.toLowerCase()))
        .filter(offer => (selectedTags.length > 0 ? selectedTags.includes(offer['as:tag']) : true)),
    [offers, textFilter, selectedTags]
  );

  return (
    <Box p={4}>
      <Paper sx={{ px: 2, py: 1, mb: 4 }}>
        <Typography variant="h3" sx={{ my: 1, mb: 2 }}>
          Offres publiques
        </Typography>
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            value={textFilter}
            onChange={e => setTextFilter(e.target.value)}
            placeholder="Filter les offres"
            sx={{ mb: 2 }}
          />
          <TagsSelector tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </Box>
      </Paper>
      <Grid container spacing={2}>
        {filteredOffers?.map(offer => (
          <Grid item xs={4} key={offer.id}>
            <OfferCard offer={offer} tags={tags} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OffersPage;
