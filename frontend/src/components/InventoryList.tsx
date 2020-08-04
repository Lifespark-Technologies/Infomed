import React from "react";
import { List, Datagrid, TextField, EmailField, EditButton } from 'react-admin';

export default (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="resource" />
            <TextField source="available" />
            <TextField source="total" />
            <TextField source="unit" />
            <EditButton />
        </Datagrid>
    </List>
);