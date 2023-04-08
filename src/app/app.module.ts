import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { Routes } from '@angular/router';
import { ServiceCallDialogComponent } from './components/service-call-dialog/service-call-dialog.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CustomersComponent } from './components/customers/customers.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TechnicianItemComponent } from './components/technician-item/technician-item.component';
import { EquipmentItemComponent } from './components/equipment-item/equipment-item.component';
import { TechnicianDialogComponent } from './components/technician-dialog/technician-dialog.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { AddNewCustomerComponent } from './components/add-new-customer/add-new-customer.component';
import { EditCustomerLocationComponent } from './components/edit-customer-location/edit-customer-location.component';
import { ServiceCallBoardComponent } from './components/service-call-board/service-call-board.component';
import { PartsComponent } from './components/parts/parts.component';
import { EquipmentEditComponent } from './components/equipment-edit/equipment-edit.component';
import { PartsDialogComponent } from './components/parts-dialog/parts-dialog.component';
import { EditPartsComponent } from './components/edit-parts/edit-parts.component';
import { EditPartsOrderDialogComponent } from './components/edit-parts-order-dialog/edit-parts-order-dialog.component';
import { EquipPartsOrderComponent } from './components/equip-parts-order/equip-parts-order.component';
import { EquipPartsOrderDialogComponent } from './components/equip-parts-order-dialog/equip-parts-order-dialog.component';
import { PartsVendorItemComponent } from './components/parts-vendor-item/parts-vendor-item.component';
import { PartOrderItemDialogComponent } from './components/part-order-item-dialog/part-order-item-dialog.component';
import { PartsVendorDialogComponent } from './components/parts-vendor-dialog/parts-vendor-dialog.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { EditServiceCallComponent } from './components/edit-service-call/edit-service-call.component';
import { AngularMaterialModule } from './angular-material.module';
import { DocumentComponent } from './components/document/document.component';
import { DocumentDialogComponent } from './components/document-dialog/document-dialog.component';
import { ServiceCallAlarmComponent } from './components/service-call-alarm/service-call-alarm.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApptDialogComponent } from './components/appt-dialog/appt-dialog.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { VendorDialogComponent } from './components/vendor-dialog/vendor-dialog.component';
import { ContractDialogComponent } from './components/contract-dialog/contract-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BlobStoreListComponent } from './components/blob-store-list/blob-store-list.component';
import { BlobStoreDialogComponent } from './components/blob-store-dialog/blob-store-dialog.component';
import { SkuBrowserComponent } from './components/sku-browser/sku-browser.component';
import { EPartsComponent } from './components/e-parts/e-parts.component';






const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainLayoutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DashboardItemComponent,
    MainLayoutComponent,
    SideNavComponent,
    ServiceCallDialogComponent,
    AddUserComponent,
    CustomersComponent,
    UserListComponent,
    TechnicianItemComponent,
    EquipmentItemComponent,
    TechnicianDialogComponent,
    AddNewCustomerComponent,
    EditCustomerComponent,
    EditCustomerLocationComponent,
    ServiceCallBoardComponent,
    PartsComponent,
    EquipmentEditComponent,
    PartsDialogComponent,
    EditPartsComponent,
    EditPartsOrderDialogComponent,
    EquipPartsOrderComponent,
    EquipPartsOrderDialogComponent,
    PartsVendorItemComponent,
    PartOrderItemDialogComponent,
    PartsVendorDialogComponent,
    EditServiceCallComponent,
    DocumentComponent,
    DocumentDialogComponent,
    ServiceCallAlarmComponent,
    ApptDialogComponent,
    VendorComponent,
    VendorDialogComponent,
    ContractDialogComponent,
    BlobStoreDialogComponent,
    BlobStoreListComponent,
    SkuBrowserComponent,
    EPartsComponent
  
    
   
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    BrowserModule,

  
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectFilterModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatButtonToggleModule
 

  
  
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//export class ApptDialogComponentModule {}

