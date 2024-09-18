import React from 'react';
import { TextInput, required, SimpleForm, SelectInput } from 'react-admin';
import { DateTimeInput } from '@semapps/date-components';
import {ReferenceInput} from '@semapps/input-components';
import { EditToolbarWithPermissions } from "@semapps/auth-provider";

const OfferForm = () => {
  console.log('toolbar', toolbar);
  return (
  <SimpleForm toolbar={<EditToolbarWithPermissions />}>
    <TextInput source="name" fullWidth validate={[required()]} />
    <ReferenceInput source="as:tag" reference="Concept">
      <SelectInput fullWidth optionText="skos:prefLabel" />
    </ReferenceInput>
  </SimpleForm>
)};

export default OfferForm;
