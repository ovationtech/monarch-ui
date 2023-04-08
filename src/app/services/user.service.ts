import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { 


  }

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  };


  httpBLOBOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
       responseType:'blob'
    })
  };

  login(loginObj:any){
    return this.httpClient.post(environment.apiUrl + '/adminop/userlogin',JSON.stringify(loginObj),this.httpOptions);
  }

  createUser(objUser:any){
    return  this.httpClient.post(environment.apiUrl+'/adminop/createuser',JSON.stringify(objUser),this.httpOptions);
  }
    
  getUsers(){
    return  this.httpClient.get(environment.apiUrl+'/adminop/getusers',this.httpOptions);
  }
  getUsers1(){
    return  this.httpClient.get(environment.apiUrl+'/adminop/getusers1',this.httpOptions);
  }
  updateUser(objUser:any){
    return  this.httpClient.post(environment.apiUrl+'/adminop/updateuser',JSON.stringify(objUser),this.httpOptions);
  }
  insertCustomer(objUser:any){
    return  this.httpClient.post(environment.apiUrl+'/adminop/insertcustomer',JSON.stringify(objUser),this.httpOptions);
  }
  
    
  getRoles(){
    return  this.httpClient.get(environment.apiUrl+'/adminop/getroles',this.httpOptions);
  }

}