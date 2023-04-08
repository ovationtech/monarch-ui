import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DataService } from "src/app/services/data.service";
import { UserService } from "src/app/services/user.service";
import { AddNewCustomerComponent } from "../add-new-customer/add-new-customer.component";
import { EditCustomerLocationComponent } from "../edit-customer-location/edit-customer-location.component";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  dataaa: any = {
    key: ['customer_name', 'customer_id', 'address1', 'address2', 'city', 'state', 'zip', 'country', 'contact_name'],
    name: ['Custoner Name', 'Customer Id', 'Address 1st', 'Address Second', 'City', 'State', 'ZIP', 'Country', 'Contact Name'],

  };

  locatioData: any = {
    key: ['location_id', 'address1', 'address2', 'city', 'state', 'zip', 'country'],
    name: ['Location Id', 'address1', 'address2', 'city', 'state', 'zip', 'country'],
    link: ['location_id']
  }

  selectedOption = 1;
  [x: string]: any;
  @Input() customerData: any;
  userId: any;

  customerForm!: FormGroup;
  editcustomerForm!: FormGroup;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<EditCustomerComponent>, private userDataService: UserService, private dataService: DataService) {

  }
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    console.log('customer details Data---------------', this.data);
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id



    this.customerForm = this.fb.group({
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

    this.dataSource = new MatTableDataSource(this.data?.locationd_details);
    this.isProgress = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.editcustomerForm = this.fb.group({
      customer_id: [this.data.customer_id],
      u_location_id: [this.data.locationd_details.find((item: { location_id: any; }) => item.location_id === 'PRIMARY')?.id],
      customer_name: ['', Validators.required],
      short_name: [''],
      contact_name: ['', Validators.required],
      mail_address: ['', [Validators.required, Validators.email]],
      mobile_number: ['', Validators.required],
      statement_name: [''],
      name_soundex: [''],
      isactive: [true],
      added_by: [this.userId],
      address_id: ['', Validators.required],
      location_id: ['PRIMARY'],
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
      contactName: [''],
      salesRep: [''],
      receiveEdiCalls: [''],
      enableEdiUpdates: [''],
      user_id: [this.userId]
    });

    console.log("Data--------------------------=========================kkk", this.data)
    console.log("sub dataaaaaaaaaaaaaaaaaaaa----->", this.data.locationd_details.find((item: { location_id: any; }) => item.location_id === 'PRIMARY'))
    this.editcustomerForm?.patchValue(this.data)
    this.editcustomerForm?.patchValue(this.data.locationd_details.find((item: { location_id: any; }) => item.location_id === 'PRIMARY'))

  }

  locationedit(element: any) {//ajklfjlk;sjflkajlksfjl;akjds;flkasjfklajs;lfkjasd;klfjkla;sjfkl
    console.log("Update user data----", element)
    const dialogRef = this.dialog.open(EditCustomerLocationComponent, {
      width: '50%',
      height: '70%',
      data: {
        data: element,
        customer_id: this.data.customer_id
      }
    });
  }

  showOption(option: number) {
    this.selectedOption = option;
  }
  close(): void {
    this.dialogRef.close();
  }


  onSubmit(): void {
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--', this.customerForm.value);
    // Call API to update
    this.dataService.upsertCustomerLocation(this.customerForm.value).subscribe((res) => {
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

  onSubmitc(): void {
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--', this.editcustomerForm.value);
    // Call API to update
    this.dataService.upsertCustomerWithLocation(this.editcustomerForm.value).subscribe((res) => {
      console.log("Submitt----============================>", res)
      // if (res ==Cus== 'SUCCESS'){
      alert(' Customer data updated succesfully');
      this.dialogRef.close();
      // }
      // else{
      //   alert('Something went wrong')
      // }
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


