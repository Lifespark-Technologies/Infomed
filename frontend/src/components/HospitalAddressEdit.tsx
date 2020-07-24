import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export default (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="street" />
      <TextInput source="city" />
      <NumberInput source="zip" />
      <TextInput source="country" />
    </SimpleForm>
  </Edit>
);
