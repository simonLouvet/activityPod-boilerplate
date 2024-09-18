import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, TopToolbar, EditButton } from 'react-admin';
// import JoinButton from '../../common/buttons/JoinButton';



const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="content" />
      <DateField source="startTime" />
    </SimpleShowLayout>
  </Show>
);

export default EventShow;
