import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, TopToolbar, EditButton } from 'react-admin';
import {ReferenceField} from '@semapps/field-components';
// import JoinButton from '../../common/buttons/JoinButton';



const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceField source="as:tag" reference="Concept">
        <TextField source="skos:prefLabel" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default EventShow;
