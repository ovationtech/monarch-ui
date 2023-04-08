
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-parts-vendor-dialog',
  templateUrl: './parts-vendor-dialog.component.html',
  styleUrls: ['./parts-vendor-dialog.component.scss']
})
export class PartsVendorDialogComponent {

  user: any;
  registerform!: FormGroup;
  userId: any;
  
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PartsVendorDialogComponent>, private userData:DataService , private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any)

    {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.formBuilder.group({

        id:[],
        system_id: ['', Validators.required],
        vendor_id: ['', Validators.required],
        vendor_long_name: ['', Validators.required],
        vendor_address_1: [''],
        vendor_address_2: [''],
        vendor_city: [''] ,
        vendor_state: [''],
        vendor_zip: [''],
        vendor_phone_1: [''],
        vendor_phone_2: [''],
        vendor_fax: [''],
        vendor_term: [''],
        vendor_contact: [''] ,
        vendor_ship_method : [''],
        vendor_email: [''],
        vendor_website: [''],
        vendor_do_not_use : [''],
        vendor_notes : [''],
        added_by: [null],
        added_on: [null],
        modified_by: [null],
        modified_on: [null],
        isactive: [null],

        city: [null],
        state: [null],
        user_id:[this.userId]

      })
      this.registerform?.patchValue(data)

    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    proceedregister() {

      if (this.registerform.valid) {
        this.userData.editpartvendor(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)

          alert('succesfully');
        });
  
  
      }

    }

}
