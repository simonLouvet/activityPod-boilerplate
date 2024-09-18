import React from 'react';
import { List, SimpleList } from 'react-admin';

const ConceptList = () => {
  return (
    <List perPage={1000}>
      <SimpleList primaryText={record => record['skos:prefLabel']} secondaryText={record => record.startTime} linkType="show" />
    </List>
  );
};

export default ConceptList;
