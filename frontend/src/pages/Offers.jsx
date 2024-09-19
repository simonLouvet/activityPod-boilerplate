import { useState } from 'react';
import { useGetList } from 'react-admin';
import { Grid, Box, TextField, Paper, Typography, Button } from '@mui/material';
import OfferCard from '../components/OfferCard';
import { useMemo } from 'react';
import TagsSelector from '../components/TagsSelector';

const OffersPage = () => {
  const { data: offers = [] } = useGetList('Offer');
  const { data: tags = [] } = useGetList('Concept');

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
    <Box p={4} bgcolor="#90CAF9" minHeight="100vh">
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
          <Grid item xs={12} md={6} lg={4} xl={3} key={offer.id}>
            <OfferCard
              offer={offer}
              tags={tags}
              Actions={() => (
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" color="secondary">
                    Je le veux !
                  </Button>
                </Box>
              )}
            />
          </Grid>
        ))}
        {filteredOffers?.length === 0 && (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="overline" fontSize={16} color="white">
              Aucune offre ne correspond
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OffersPage;
