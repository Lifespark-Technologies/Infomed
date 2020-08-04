import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export default (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="resource" />
      <NumberInput source="total" />
      <NumberInput source="available" />
      <TextInput source="unit" />
    </SimpleForm>
  </Edit>
);
