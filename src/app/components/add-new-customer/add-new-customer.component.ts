import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent {
  customerForm: FormGroup;
  userId: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,  public dialogRef: MatDialogRef<AddNewCustomerComponent>, private dataService: DataService
    ) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
    this.customerForm = this.formBuilder.group({
      customer_name: ['', Validators.required],
      short_name: ['', Validators.required],
      contact_name: ['', Validators.required],
      mail_address: ['', [Validators.required, Validators.email]],
      mobile_number: [, Validators.required],
      statement_name: [''],
      name_soundex: [''],
      isactive: [true],
      added_by: [this.userId],
      address_id: ['', Validators.required],
      location_id :['PRIMARY'],
      address1 :['',[Validators.required]],
      address2 :[''],
      city :['',Validators.required],
      state :['',Validators.required],
      zip :['',Validators.required],
      country :['',Validators.required],
      phone1 :['',Validators.required],
      phone2 :[''],
      fax :[''],
      cntcprsn :[''],
      do_not_use :[''],
      hold_for_address_1 :[''],
      shipping_account_number:[''],   
      contactName: [''],
      salesRep: [''],
      receiveEdiCalls: [''],
      enableEdiUpdates: [''],
      customer_id: [null],
      u_location_id: [null],
      user_id:[this.userId]
      

    });
  }

  onSubmit() {
    console.log("------------",this.customerForm.value)
    // Do something with the form data
    this.dataService.upsertCustomerWithLocation(this.customerForm.value).subscribe((res) =>{
      console.log("Submitt----",res)
      // if (res === 'SUCCESS'){
        alert('Customer created succesfully');
        //this.dialogRef.close();
      // }
      // else{
      //   alert('Something went wrong')
      // }
    })
  }
}
