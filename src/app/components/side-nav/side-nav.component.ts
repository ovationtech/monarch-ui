import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  sideMenuItems: any;
  user: any

  constructor() {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}');



    if (this.user && this.user.usertype === 'ADMIN') {
      this.sideMenuItems = sideMenusAdmin;
    } else {
      this.sideMenuItems = sideMenus;
    }

  }
}





const sideMenus = [

  /*  { icon: 'account_box', name: 'User List', path: 'userlist', children: [] },
   { icon: 'group', name: 'Customers', path: 'customers', children: [] },
   { icon: 'settings_applications', name: 'Technician', path: 'technician', children: [] },
   { icon: 'call_made ', name: 'Service Call Board', path: 'servicecallboard', children: [] }, */
  { icon: 'call_made', name: 'Service Call Board', path: 'servicecallboard', children: [] },
  { icon: 'settings_applications', name: 'Parts', path: 'parts', children: [] },
  { icon: 'settings_applications', name: 'Parts-Order', path: 'editparts', children: [] },
  { icon: 'settings_applications', name: 'Equipment', path: 'equipment', children: [] },
  { icon: 'settings_applications', name: 'Equip-Part-Order', path: 'equippartorder', children: [] },
  { icon: 'settings_applications', name: 'Part-vendor', path: 'partsvendoritem', children: [] },
  { icon: 'settings_applications', name: 'Document', path: 'document', children: [] },
  { icon: 'settings_applications', name: 'Service-call-Alarm', path: 'servicecallalarm', children: [] },
  { icon: 'settings_applications', name: 'E-Parts', path: 'eparts', children: [] },




]

const sideMenusAdmin = [{ icon: 'call_made ', name: 'Service Call Board', path: 'servicecallboard', children: [] },
{ icon: 'settings_applications', name: 'Parts', path: 'parts', children: [] },
{ icon: 'settings_applications', name: 'Parts-Order', path: 'editparts', children: [] },
{
  icon: 'settings_applications', name: 'Equipment', path: 'equipment', children: [
    { icon: 'group', name: 'Search Equipment', path: 'equipment', children: [] },
    { icon: 'settings_applications', name: 'SKU Browser', path: 'sku-browser', children: [] },
  ]
},
{ icon: 'settings_applications', name: 'Equip-Part-Order', path: 'equippartorder', children: [] },
{ icon: 'settings_applications', name: 'Part-vendor', path: 'partsvendoritem', children: [] },
{ icon: 'settings_applications', name: 'Document', path: 'document', children: [] },
{ icon: 'settings_applications', name: 'Service-call-Alarm', path: 'servicecallalarm', children: [] },
{ icon: 'settings_applications', name: 'E-Parts', path: 'eparts', children: [] },
 
{
  icon: 'settings_applications',
  name: 'Admin',
  expand: false,
  children: [
    { icon: 'group', name: 'Customers', path: 'customers', children: [] },
    { icon: 'settings_applications', name: 'Technician', path: 'technician', children: [] },
    { icon: 'account_box', name: 'User List', path: 'userlist', children: [] },
    { icon: 'settings_applications', name: 'Vendor', path: 'vendor', children: [] },
    { icon: 'settings_applications', name: 'Blob Store', path: 'blobstorelist', children: [] },
  ]
}
]
