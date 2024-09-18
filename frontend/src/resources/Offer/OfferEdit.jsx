import React from 'react';
import { Edit, SimpleForm, TextInput, required,SelectInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import { EditToolbarWithPermissions } from "@semapps/auth-provider";
import { MyToolbar } from '../../common/PublishToolBar';

const OfferEdit = () => (
  <Edit >
    <SimpleForm toolbar={<MyToolbar />}>
      <TextInput source="name" fullWidth validate={[required()]} />
      <ReferenceInput source="as:tag" reference="Concept">
        <SelectInput fullWidth optionText="skos:prefLabel" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default OfferEdit;
