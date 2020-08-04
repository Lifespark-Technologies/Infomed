import React from 'react';
import { Admin, Resource} from 'react-admin';
import jsonServerProvider from  'ra-data-json-server';
import InventoryList from './InventoryList';
import UserList from './UserList';
import HospitalAdminLandingPage from './HospitalAdminLandingPage';
import HospitalAddressShow from './HospitalAddressShow';
import HospitalAddressEdit from './HospitalAddressEdit';
import UserEdit from './UserEdit';
import InventoryEdit from './InventoryEdit';

export default () => {

  // const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
  const dataProvider = jsonServerProvider('http://my-json-server.typicode.com/naijauser/infomedapi');

  return (
    <div>
      <Admin dashboard={HospitalAdminLandingPage} dataProvider={dataProvider} > 
        <Resource name="users" list={UserList} edit={UserEdit} />
        <Resource name="inventory" list={InventoryList} edit={InventoryEdit} />
        <Resource name="hospital_address" show={HospitalAddressShow} edit={HospitalAddressEdit} />
      </Admin>
    </div>
  )
}