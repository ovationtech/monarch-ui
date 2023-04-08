import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  patchObject(id: any, value: any) {
    throw new Error('Method not implemented.');
  }
  public stateoptions: string[] = ['', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', "IN", 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA'];
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getData() {

    return this.httpClient.get(`${environment.apiUrl}/service-call/getservicecalldata`, this.httpOptions);
  }

  getalltechnicianData(objUser: any) {

    return this.httpClient.post(`${environment.apiUrl}/service-call/gettechnicianalldata`, JSON.stringify(objUser), this.httpOptions);
  }
  getequipmentData(objUser: any) {

    return this.httpClient.post(`${environment.apiUrl}/service-call/getequipmentalldata`, JSON.stringify(objUser), this.httpOptions);
  }

  getEquipManufacturer(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getequipmanufacturer`, JSON.stringify(obj), this.httpOptions);
  }

  getEquipType(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getequiptype`, JSON.stringify(obj), this.httpOptions);
  }

  getEquipTypeByManufacturer(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getequiptypebymanufacturer`, JSON.stringify(obj), this.httpOptions);
  }


  editequipment(objUser: any) {
    return this.httpClient.post(environment.apiUrl + '/service-call/upsertequipmentdata', JSON.stringify(objUser), this.httpOptions);
  }

  
  getpartsdata(objUser:any){

    return this.httpClient.post(`${environment.apiUrl}/service-call/get_equip_part_name_data`,JSON.stringify(objUser),this.httpOptions);

  }

  editpartsname(objUser:any){

    return this.httpClient.post(`${environment.apiUrl}/service-call/insert_update_equip_part_name`,JSON.stringify(objUser),this.httpOptions);

  }

  getpartsorderdata(objUser:any){

    return this.httpClient.post(`${environment.apiUrl}/service-call/getpartorderdata`,JSON.stringify(objUser),this.httpOptions);


  }

  editpartorderdata(objUser:any){

    return this.httpClient.post(`${environment.apiUrl}/service-call/upsertingpartsorderdata`,JSON.stringify(objUser),this.httpOptions);
  }

  getequippartsorder(objUser:any){

    return  this.httpClient.post(environment.apiUrl+'/service-call/getequippartorderdetailsdata',JSON.stringify(objUser),this.httpOptions);
  }
  editpartorderitem(objUser:any){
    return this.httpClient.post(`${environment.apiUrl}/service-call/upsertpartsorderitem`,JSON.stringify(objUser),this.httpOptions);
  
  }

  getdocument(objUser:any){
    return  this.httpClient.post(environment.apiUrl+'/service-call/getdocumentdatabyallid',JSON.stringify(objUser),this.httpOptions);
  }

  getpartsvendor(objUser:any){
    return this.httpClient.post(`${environment.apiUrl}/service-call/getallpartsvendor`,JSON.stringify(objUser),this.httpOptions);
  }

  editpartvendor(objUser:any){
    return this.httpClient.post(`${environment.apiUrl}/service-call/upsertpartvendor`,JSON.stringify(objUser),this.httpOptions);
  }


  getallblobstore(objUser: any) {

    return this.httpClient.post(`${environment.apiUrl}/service-call/getblobstore`, JSON.stringify(objUser), this.httpOptions);
  }


  upsert_blobstore(objUser: any){
    
    return this.httpClient.post(`${environment.apiUrl}/service-call/upsertblobstore`, JSON.stringify(objUser), this.httpOptions);
  }


  getallvendor(objUser:any){
    return  this.httpClient.post(environment.apiUrl+'/service-call/getvendor',JSON.stringify(objUser),this.httpOptions);
  }

  upsertvendor(objUser:any){
    return  this.httpClient.post(environment.apiUrl+'/service-call/upsertingvendordata',JSON.stringify(objUser),this.httpOptions);
  }

  upsertLocationcontract(objUser:any){
    return this.httpClient.post(environment.apiUrl+'/service-call/upsertlocationcontractdata',JSON.stringify(objUser),this.httpOptions);
  }

  getlocationcontractData(objUser:any){
    return this.httpClient.post(environment.apiUrl+'/service-call/getlocationcontractdata',JSON.stringify(objUser),this.httpOptions);
    
  }
  getDataorderItem(objUser: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/get_parts_order_item_data`, JSON.stringify(objUser), this.httpOptions);
  }


  

  getservicecallalarmalltData(objUser: any) {

    return this.httpClient.post(`${environment.apiUrl}/service-call/getservicecalllarmbycallnumber`, JSON.stringify(objUser), this.httpOptions);
  }

  insertservicecallalarm(objUser: any){
    
    return this.httpClient.post(`${environment.apiUrl}/service-call/insertservicecallalarmwithdetails`, JSON.stringify(objUser), this.httpOptions);
  }

  getcustomerData(objUser: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getcustomerdetails`, JSON.stringify(objUser), this.httpOptions);
  }

  upsertCustomerWithLocation(objUser: any) {
    return this.httpClient.post(environment.apiUrl + '/service-call/upsertcustomerwithlocation', JSON.stringify(objUser), this.httpOptions);
  }

  upsertCustomerLocation(objUser: any) {
    return this.httpClient.post(environment.apiUrl + '/service-call/upsertcustomerlocation', JSON.stringify(objUser), this.httpOptions);
  }

  getServiceCallsByStatus(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getservicecall`, JSON.stringify(obj), this.httpOptions);
  }
  getequipment(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getequipmentlist`, JSON.stringify(obj), this.httpOptions);
  }
  gettechnician(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/gettechnicianslist`, JSON.stringify(obj), this.httpOptions);
  }
  getequip(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getequipmentalldata`, JSON.stringify(obj), this.httpOptions);
  }
  insertserviceCall(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/insertservice_call`, JSON.stringify(obj), this.httpOptions);
  }
  getcusloc(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getlocationandcustomerbyequipment_id`, JSON.stringify(obj), this.httpOptions);
  }
  getLocationNotes(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getlocationbyid`, JSON.stringify(obj), this.httpOptions);
  }
  getEqupipmentNotes(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getequipmentbyid`, JSON.stringify(obj), this.httpOptions);
  }
  getServiceCallsByid(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/xxxxxxxxx`, JSON.stringify(obj), this.httpOptions);
  }
  getservicecalldata(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getservicecall`, JSON.stringify(obj), this.httpOptions);
  }
  updateserviceCall(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/updateservicecall`, JSON.stringify(obj), this.httpOptions);
  }
  getserviceCallNotes(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getservicecallnotesby`, JSON.stringify(obj), this.httpOptions);
  }
  insertAppointment(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/insertappointment`, JSON.stringify(obj), this.httpOptions);
  }
  updateAppointments(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/updateappointment`, JSON.stringify(obj), this.httpOptions);
  }
  getAppointmentLists(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getapptbyservicecall`, JSON.stringify(obj), this.httpOptions);
  }
  deleteAppointment(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/deleteapptbyid`, JSON.stringify(obj), this.httpOptions);
  }
  getApppointmentNotes(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/getnotesbynotetype`, JSON.stringify(obj), this.httpOptions);
  }
  insertWorkOrderOfApptWorkOrder(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/updateservicecallworkorder`, JSON.stringify(obj), this.httpOptions);
  }
  updateSlaTracker(obj: any) {
    return this.httpClient.post(`${environment.apiUrl}/service-call/updateslatracker`, JSON.stringify(obj), this.httpOptions);
  }




  public user: User = new User();
  public get getUser(): User {
    return this.user;
  }

  public set setUser(usr: User) {
    this.user = usr;
  }


}
