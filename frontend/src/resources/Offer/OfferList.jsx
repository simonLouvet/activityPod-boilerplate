import React from 'react';
import { List, SimpleList, useGetIdentity, useListContext, ListContextProvider } from 'react-admin';

const OfferListContent = props => {
  const { data: user, isPending, error } = useGetIdentity();
  let { data } = useListContext();

  const filtered = data?.filter(o => o['dc:creator'] !== user.id) || [];
  console.log(filtered);
  return <ListContextProvider value={{ data: filtered }}>{props.children}</ListContextProvider>;
};

const OfferList = () => {
  const { data: user, isPending, error } = useGetIdentity();
  console.log(user);

  return (
    user?.id && (
      // <List  filter={[{field: 'http://purl.org/dc/terms/creator', operator: '!=', value: data.id}]} sort={{ field: 'vcard:given-name', order: 'ASC' }} perPage={1000}>
      // <List sort={{ field: 'vcard:given-name', order: 'ASC' }} perPage={1000}>
      <>
        <List
          filter={{ 'http://purl.org/dc/terms/creator': user.id }}
          sort={{ field: 'vcard:given-name', order: 'ASC' }}
          perPage={1000}
        >
          <SimpleList primaryText={record => record.name} linkType="show" />
        </List>
        <List sort={{ field: 'vcard:given-name', order: 'ASC' }} perPage={1000}>
          <OfferListContent>
            <SimpleList primaryText={record => record.name} linkType="show" />
          </OfferListContent>
        </List>
      </>
    )
  );
};

export default OfferList;
