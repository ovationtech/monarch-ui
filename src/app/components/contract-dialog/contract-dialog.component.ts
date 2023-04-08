
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contract-dialog',
  templateUrl: './contract-dialog.component.html',
  styleUrls: ['./contract-dialog.component.scss']
})
export class ContractDialogComponent {

  locationeditForm: any;
  locatioData: any = {

  }
  userId: any;
  locationContracts: any[] = [];
  arrayData!: any[];


  dataa: any = {
    key: ['id', 'location_record', 'contract_id', 'contract_type', 'contract_amount', 'start_date', ],
    name: ['id', 'location_record', 'contract_id', 'contract_type', 'contract_amount', 'start_date',],
    link: ['id']
  }
  dataas: any;




  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ContractDialogComponent>, private dataService: DataService) {

    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    
  }
  




  ngOnInit(): void {


    console.log('Location details Data---------------ooooooooooo', this.dataa);
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.locationeditForm = this.fb.group({
      id: [null],
      customer_id: [this.data.customer_id],
      location_id: [this.data.location_id],
      location_record: [null],
      contract_id: [''],
      contract_type: ['', Validators.required],
      contract_amount: ['', Validators.required],
      start_date: ['', Validators.required],
      stop_date: ['', Validators.required],
      anniversary: ['', Validators.required],
      auto_bill: [null],
      cancel_contract: [''],
      cancel_reason: [''],
      on_hold: [null],
      hold_reason: [null],
      bill_freq: [''],
      added_by: [this.userId],
      isactive: [true],
      tax_sched: [''],
      po_number: [''],
      primary_tech: [null],
      secondary_tech: [null],
      master_note: [''],
      marker: [null],
      modified_by: [this.userId],
      user_id:[this.userId]
    });
    
    this.dataService.getlocationcontractData({user_id:this.userId,id:1}).subscribe((dataas: any) => {
      console.log("location contract data-------------====================--",dataas);
      this.dataas = dataas; // set dataas to the returned data from the API
      const contract = this.dataas.find((c: any) => c.id === 1); // Get the contract with id = 1
      if (contract) {
        this.locationeditForm.patchValue(contract); // Patch all values into the form
      }
    });
   
    

  }
  

  onSubmit(): void {
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--', this.locationeditForm.value);
    // Call API to update
    this.dataService.upsertLocationcontract(this.locationeditForm.value).subscribe((res) => {
      console.log("Submitt----", res)
      // if (res ==Cus== 'SUCCESS'){
      alert('  location contrct added succesfully');
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

}
