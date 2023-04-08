import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnicianNewService {

  constructor(private http:HttpClient) { }

  apiurl='http://127.0.0.1:8000/service-call/upsertingtechniciandata';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
}
}
