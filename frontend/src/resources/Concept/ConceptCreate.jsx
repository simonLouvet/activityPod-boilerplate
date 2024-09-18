import React from 'react';
import { Create } from 'react-admin';
import { SimpleForm, TextInput, required } from 'react-admin';

const ConceptCreate = () => (
  <Create>
    <SimpleForm >
      <TextInput source="skos:prefLabel" fullWidth validate={[required()]} />
    </SimpleForm>
  </Create>
);

export default ConceptCreate;
