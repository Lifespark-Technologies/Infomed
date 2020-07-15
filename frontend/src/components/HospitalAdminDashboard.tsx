import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { fetchHospitalInventory } from '../apis/infomed';
import jsonServerProvider from  'ra-data-json-server';
import UserList from './InventoryList';
import InventoryList from './UserList';

export default () => {

  // const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
  const dataProvider = jsonServerProvider('http://my-json-server.typicode.com/naijauser/infomedapi');

  return (
    <div>
      <Admin dataProvider={dataProvider} > 
        <Resource name="inventory" list={UserList} edit={EditGuesser} />
        <Resource name="users" list={InventoryList} edit={EditGuesser} />
      </Admin>
    </div>
  )
}