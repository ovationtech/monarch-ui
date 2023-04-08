import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginMsg: string = "";
  loginForm: FormGroup;
  user_name = '';
  production = environment.production;
  constructor(private fb: FormBuilder, private route: Router, private userService:UserService,private dataService:DataService) {

    this.loginForm = fb.group({
      'user_id': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]

    });

  }

  ngOnInit(): void {
    this.loginMsg="";
  }

  login() {
    //alert(this.loginForm.controls["emailid"].value);
    let userid = this.loginForm.controls["user_id"].value;
    let pwd = this.loginForm.controls["password"].value;

    let objLogin = {
      user_id: userid,
      password: pwd
    }

    this.userService.login(<any>objLogin).subscribe(
      (data: any) => {

        let result = <any>data;

       // console.log(result.user,"user....")
       // console.log(result.agency,"agency....")
        console.log(result.message)
        if (result.message != "FAILURE") {
         
          sessionStorage.setItem("user", JSON.stringify(result.user))
          sessionStorage.setItem("access_token", JSON.stringify(result.access_token))
          this.dataService.user=result.user;
          // Store whether the logged in user is an admin or not in session storage
            let isAdmin = result.user.usertype === 'ADMIN';
            sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
          console.log(this.dataService.user.usertype)
          console.log(result)
        //  console.log( JSON.parse(sessionStorage.getItem("user")))
          sessionStorage.setItem("agency", JSON.stringify(result.agency))
          console.log(sessionStorage.getItem("user"))          
          this.route.navigate(['/main/servicecallboard']);
          }
          else {
            this.loginMsg = "Invalid userid or password"
          }
       
  });
}


}
