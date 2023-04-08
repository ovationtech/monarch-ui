import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ContractDialogComponent } from '../contract-dialog/contract-dialog.component';

@Component({
  selector: 'app-edit-customer-location',
  templateUrl: './edit-customer-location.component.html',
  styleUrls: ['./edit-customer-location.component.scss']
})
export class EditCustomerLocationComponent {

  locationeditForm: any;
  locatioData: any = {

  }
  userId: any;




  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<EditCustomerLocationComponent>, private dataService: DataService) {

  }



  ngOnInit(): void {
    console.log('Location details Data---------------ooooooooooo', this.data);
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.locationeditForm = this.fb.group({
      id: [null],
      customer_id: [this.data.customer_id],
      location_id: [''],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      fax: [''],
      cntcprsn: [''],
      do_not_use: [''],
      hold_for_address_1: [''],
      shipping_account_number: [''],
      added_by: [this.userId],
      isactive: [true],
      contactName: [''],
      salesRep: [''],
      receiveEdiCalls: [''],
      enableEdiUpdates: [''],
      user_id:[this.userId]
    });
    console.log("Data-----", this.data)
    this.locationeditForm?.patchValue(this.data.data)

  }

  onSubmit(): void {
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--', this.locationeditForm.value);
    // Call API to update
    this.dataService.upsertCustomerLocation(this.locationeditForm.value).subscribe((res) => {
      console.log("Submitt----", res)
      // if (res ==Cus== 'SUCCESS'){
      alert(' Customer location added succesfully');
      this.dialogRef.close();
      // }
      // else{
      //   alert('Something went wrong')
      // }
    })

  }

  close(): void {
    this.dialogRef.close();
  }

  openDialog(data: any) {
    console.log("Customer data----", data)
    const dialogRef = this.dialog.open(
      ContractDialogComponent,
      {
        height: 'auto',
        width: '50%',
        disableClose: true,
        data: data
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
      dialogRef.close(); // Close the dialog box
    });
  }

}
