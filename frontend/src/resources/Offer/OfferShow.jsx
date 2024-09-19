import { Show, useRecordContext, useGetList } from 'react-admin';
import { Box } from '@mui/material';
import { ShareButton } from '@activitypods/react';
import OfferCard from '../../components/OfferCard';

const OfferRecordCard = () => {
  const record = useRecordContext();
  const { data: tags = [] } = useGetList('Concept');

  if (!record) return null;

  return (
    <OfferCard
      offer={record}
      tags={tags}
      Actions={() => (
        <Box display="flex" justifyContent="flex-end">
          <ShareButton profileResource={'Contact'} />
        </Box>
      )}
    />
  );
};

const EventShow = props => {
  return (
    <Show>
      <OfferRecordCard />
    </Show>
  );
};

export default EventShow;
