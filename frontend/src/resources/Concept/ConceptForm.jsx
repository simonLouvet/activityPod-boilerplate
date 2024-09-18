import React from 'react';
import { TextInput, required, SimpleForm } from 'react-admin';
import { DateTimeInput } from '@semapps/date-components';

const ConceptForm = () => (
  <SimpleForm>
    <TextInput source="skos:prefLabel" fullWidth validate={[required()]} />
  </SimpleForm>
);

export default ConceptForm;
