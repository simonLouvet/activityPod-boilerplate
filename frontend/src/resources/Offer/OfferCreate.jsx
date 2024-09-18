import React from 'react';
import { Create } from 'react-admin';
import { SimpleForm, TextInput, required, SelectInput } from 'react-admin';
import {ReferenceInput} from '@semapps/input-components';

const OfferCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" fullWidth validate={[required()]} />
      <ReferenceInput source="as:tag" reference="Concept">
        <SelectInput fullWidth optionText="skos:prefLabel" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default OfferCreate;
