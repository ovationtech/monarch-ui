import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { EquipmentItemComponent } from './components/equipment-item/equipment-item.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TechnicianItemComponent } from './components/technician-item/technician-item.component';
import { ServiceCallAlarmComponent } from './components/service-call-alarm/service-call-alarm.component';
import { ServiceCallBoardComponent } from './components/service-call-board/service-call-board.component';
import { PartsComponent } from './components/parts/parts.component';
import { EditPartsComponent } from './components/edit-parts/edit-parts.component';
import { EquipPartsOrderComponent } from './components/equip-parts-order/equip-parts-order.component';
import { PartsVendorItemComponent } from './components/parts-vendor-item/parts-vendor-item.component';
import { DocumentComponent } from './components/document/document.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { AuthGuard } from './auth.guard';
import { BlobStoreListComponent } from './components/blob-store-list/blob-store-list.component';
import { EPartsComponent } from './components/e-parts/e-parts.component';
import { SkuBrowserComponent } from './components/sku-browser/sku-browser.component';

//,canActivate: [AuthGuard]

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LogoutComponent },
{
  path: 'main', component: MainLayoutComponent, children: [
    {path: 'dashboard', component: DashboardItemComponent },
    {path:'customers', component:CustomersComponent,canActivate: [AuthGuard]},
    {path:'userlist', component:UserListComponent,canActivate: [AuthGuard]},
    {path: 'technician', component: TechnicianItemComponent,canActivate: [AuthGuard] },
    {path: 'equipment', component: EquipmentItemComponent },
    {path: 'eparts', component: EPartsComponent },

    {path:'servicecallalarm',component:ServiceCallAlarmComponent},
    {path:'servicecallboard',component:ServiceCallBoardComponent},
    {path:'parts',component:PartsComponent},
    {path:'editparts',component:EditPartsComponent},
    {path:'equippartorder',component:EquipPartsOrderComponent},
    {path:'partsvendoritem',component:PartsVendorItemComponent},
    {path:'document',component:DocumentComponent},
    {path:'vendor',component:VendorComponent,canActivate: [AuthGuard]},
    {path:'blobstorelist',component:BlobStoreListComponent},
    {path:'sku-browser',component:SkuBrowserComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
