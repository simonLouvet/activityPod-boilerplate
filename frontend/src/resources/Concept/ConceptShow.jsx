import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, TopToolbar, EditButton } from 'react-admin';
// import JoinButton from '../../common/buttons/JoinButton';



const ConceptShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="skos:prefLabel" />
    </SimpleShowLayout>
  </Show>
);

export default ConceptShow;
