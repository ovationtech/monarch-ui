import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vendor-dialog',
  templateUrl: './vendor-dialog.component.html',
  styleUrls: ['./vendor-dialog.component.scss']
})
export class VendorDialogComponent {



  user:any;
  userId: any;
  registerform!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder, private userData: DataService) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.builder.group({
        id: this.builder.control(null),
        vendor_id: this.builder.control('',Validators.required),
        vendor_name: this.builder.control(''),
        vendor_check_name: this.builder.control(null),
        vendor_short_name: this.builder.control(null),
        vaddcdpr: this.builder.control(null),
        vaddcdpad: this.builder.control(null),
        vaddcdsfr: this.builder.control(null),
        vaddcdtro: this.builder.control(null),
        vndclsid: this.builder.control(null),
        vendor_city: this.builder.control(''),
        vendor_state: this.builder.control(''),
        vendor_zip: this.builder.control(''),
        vendor_country: this.builder.control(null),
        vendor_address_1: this.builder.control(''),
        vendor_address_2: this.builder.control(''),
        vendor_address_3: this.builder.control(null),
        vendor_phone_1: this.builder.control(''),
        vendor_phone_2: this.builder.control(''),
        vendor_phone_3: this.builder.control(null),
        vendor_fax: this.builder.control(''),
        vendor_contact: this.builder.control(''),
        vendor_terms: this.builder.control(''),
        vendor_ship_method: this.builder.control(''),
        vendor_ship_zone: this.builder.control(''),
        vendor_tax_sched: this.builder.control(null),
        vendor_comment_1: this.builder.control(null),
        vendor_comment_2: this.builder.control(null),
        marker: this.builder.control(null),
        vendor_eom: this.builder.control(null),
        vendor_eom_process: this.builder.control(null),
        vendor_eom_data_1: this.builder.control(null),
        vendor_eom_data_2: this.builder.control(null),
        aux_string_1: this.builder.control(null),
        aux_string_2: this.builder.control(null),
        added_by: this.builder.control(null),
        modified_by: this.builder.control(null),
        isactive: this.builder.control(true),
        user_id:[this.userId]
    
      });
      console.log("Data-----",data)
      this.registerform?.patchValue(data)

    }


    
        


    
    
  
    proceedregister() {
  
      if (this.registerform.valid) {
        this.userData.upsertvendor(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)
        });
  
  
      }
    }

}
