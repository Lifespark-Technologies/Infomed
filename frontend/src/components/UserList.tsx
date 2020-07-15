import React from "react";
import { List, Datagrid, TextField, EmailField, EditButton } from 'react-admin';

export default (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="designation" />
            <EditButton />
        </Datagrid>
    </List>
);