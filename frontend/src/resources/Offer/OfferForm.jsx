import React from 'react';
import { TextInput, required, SimpleForm, SelectInput } from 'react-admin';
import { DateTimeInput } from '@semapps/date-components';
import {ReferenceInput} from '@semapps/input-components';

const OfferForm = () => (
  <SimpleForm>
    <TextInput source="name" fullWidth validate={[required()]} />
    <ReferenceInput source="as:tag" reference="Concept">
      <SelectInput fullWidth optionText="skos:prefLabel" />
    </ReferenceInput>
  </SimpleForm>
);

export default OfferForm;
