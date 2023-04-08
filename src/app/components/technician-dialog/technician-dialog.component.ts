import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechnicianNewService } from 'src/app/services/technician-new.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-technician-dialog',
  templateUrl: './technician-dialog.component.html',
  styleUrls: ['./technician-dialog.component.scss']
})
export class TechnicianDialogComponent {

  user:any;
  userId: any;
  registerform!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder, private userData: TechnicianNewService) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.builder.group({
        id: this.builder.control(null),
        business: this.builder.control(''),
        tech_id: this.builder.control('',Validators.required),
        tech_vendor_id: this.builder.control('',Validators.required),
    
        tech_dba_name: this.builder.control(''),
        tech_address_1: this.builder.control(''),
        tech_address_2: this.builder.control(''),
        tech_city: this.builder.control(''),
        tech_state: this.builder.control(''),
        tech_zip: this.builder.control(''),
        tech_country: this.builder.control(''),
    
    
    
        tech_team: this.builder.control(null),
        tech_long_name: this.builder.control(null),
    
        tech_prim_skill: this.builder.control(null),
        tech_type: this.builder.control(null),
    
    
        tech_phone_1: this.builder.control(null),
        tech_phone_2: this.builder.control(null),
        tech_fax: this.builder.control(null),
        tech_email: this.builder.control(null),
        tech_contact_1: this.builder.control(null),
        tech_contact_2: this.builder.control(null),
        stdonsiterate: this.builder.control(null),
        stdtravelrate: this.builder.control(null),
        stdmilerate: this.builder.control(null),
        ahonsiterate: this.builder.control(null),
        ahtravelrate: this.builder.control(null),
        ahmilerate: this.builder.control(null),
        shonsiterate: this.builder.control(null),
        shtravelrate: this.builder.control(null),
        shmilerate: this.builder.control(null),
        daystart: this.builder.control(null),
        dayend: this.builder.control(null),
        coverage247: this.builder.control(null),
        productsserviced: this.builder.control(null),
        tech_travel_code: this.builder.control(null),
        zipscovered: this.builder.control(null),
        remarks: this.builder.control(null),
        comments: this.builder.control(null),
        metaphone_key: this.builder.control(null),
        do_not_use: this.builder.control(null),
        do_not_ship: this.builder.control(null),
        tech_vendor_record: this.builder.control(null),
        added_by: this.builder.control(null),
        added_on: this.builder.control(null),
        modified_by: this.builder.control(null),
        modified_on: this.builder.control(null),
        isactive: this.builder.control(true),
        user_id:[this.userId]
    
      });
      console.log("Data-----",data)
      this.registerform?.patchValue(data)

    }


    
        


    
    
  
    proceedregister() {
  
      if (this.registerform.valid) {
        this.userData.RegisterUser(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)
        });
  
  
      }
    }
  
  
    
  

}
