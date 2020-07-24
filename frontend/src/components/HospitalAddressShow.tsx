import React from 'react';
import { Show, SimpleShowLayout, TextField, NumberField } from 'react-admin';

export default (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="street" />
      <TextField source="city" />
      <NumberField source="zip" />
      <TextField source="country" />
    </SimpleShowLayout>
  </Show>
);

