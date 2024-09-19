import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, TopToolbar, EditButton } from 'react-admin';
import {ReferenceField} from '@semapps/field-components';
import { ShareButton } from '@activitypods/react';
// import JoinButton from '../../common/buttons/JoinButton';



const EventShow = () => (
  <Show actions={<ShareButton profileResource={'Contact'}/>}>


    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceField source="as:tag" reference="Concept">
        <TextField source="skos:prefLabel" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default EventShow;
