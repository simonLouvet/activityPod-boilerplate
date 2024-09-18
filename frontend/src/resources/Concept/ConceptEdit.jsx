import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const ConceptEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="skos:prefLabel" fullWidth validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export default ConceptEdit;
