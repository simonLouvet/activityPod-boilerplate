import React from 'react';
import { TextInput, required, SimpleForm } from 'react-admin';
import { DateTimeInput } from '@semapps/date-components';

const OfferForm = () => (
  <SimpleForm>
    <TextInput source="name" fullWidth validate={[required()]} />
  </SimpleForm>
);

export default OfferForm;
