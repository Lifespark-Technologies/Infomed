import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export default (props: any) => (
  <Edit {...props}>
      <SimpleForm>
          <TextInput source="id" />
          <TextInput source="name" />
          <TextInput source="email" />
          <TextInput source="phone" />
          <TextInput source="designation" />
      </SimpleForm>
  </Edit>
);