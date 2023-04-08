import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  [x: string]: any;

  addUserForm!: FormGroup; // Define the addUserForm property
  allUsers: any;
  userRoles: any;
  userId:any;
  filteredUsers: any[] = []; // Define the filteredUsers array

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>, private userService: UserService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    // Initialize addUserForm with form controls
    this.addUserForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],



      address: ['Hr'],
      city: ['Hr'],
      state: ['Hr'],
      zipcode: ['1000'],
      contact_number_office: ['9876543210'],
      contact_number_mobile: ['9876543210'],
      email: ['', [Validators.required, Validators.email]],
      user_type_id: [null],
      gender: [''],
      user_group: [''],
      password: ['', this.data ? '' : Validators.required],
      access_level: ['', Validators.required],
      supervisor: ['', Validators.required],
      role_id: [],
      sarn_board: [false],
      ts_board: [false],
      tag_board: [false],
      log_board: [false],
      isactive: [false],
      alarm_owner_flg: [false],
      added_by: [this.userId],
      def_msg_type: [''],
      is_allowed_to_chat: [''],
    });

    console.log("Data-----", data)
    this.addUserForm?.patchValue(data)

  }

  ngOnInit(): void {

    this.userService.getUsers().subscribe((res) => {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",res)
      this.allUsers = res
    })

    this.userService.getRoles().subscribe((res) => {
      console.log(res)
      this.userRoles = res
    })
    this.filteredUsers = this.filterUsers('');

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  

  onSubmit() {
    if (this.addUserForm.valid) {
      console.log(this.addUserForm.value);
      if (this.data?.id) {
        // Update existing user--here the updating api will come right now its just a dummy api 
        this.userService.updateUser(this.addUserForm.value).subscribe((res) => {
          console.log("Submitt----", res)
          if (res === 'SUCCESS') {
            alert('User updated succesfully');
            this.dialogRef.close();
          }
          else {
            alert('Something went wrong')
          }
        })
      } else {
        // Create new user
        this.userService.createUser(this.addUserForm.value).subscribe((res) => {
          console.log("Submitt----", res)
          if (res === 'SUCCESS') {
            alert('User created succesfully');
            this.dialogRef.close();
          }
          else {
            alert('Something went wrong')
          }
        })
      }
    }
  }


  onInput(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredUsers = this.filterUsers(filterValue);


  }
  

  msgTypes: any = [
    { value: 'Acknowledge Alarm', viewValue: 'Acknowledge Alarm' },
    { value: 'Admin Note', viewValue: 'Admin Note' },
    { value: 'Alarm Set', viewValue: 'Alarm Set' },
    { value: 'Alarm Update', viewValue: 'Alarm Update' },
    { value: 'API Web Note', viewValue: 'API Web Note' },
    { value: 'Appointment Status', viewValue: 'Appointment Status' },
    { value: 'Appointment Status Change', viewValue: 'Appointment Status Change' },
    { value: 'Assignment', viewValue: 'Assignment' },
    { value: 'Billing Note', viewValue: 'Billing Note' },
    { value: 'Board Update', viewValue: 'Board Update' },
    { value: 'Call Info Note', viewValue: 'Call Info Note' },
    { value: 'Call Owner Change', viewValue: 'Call Owner Change' },
    { value: 'Call Status', viewValue: 'Call Status' },
    { value: 'Call Type Changed', viewValue: 'Call Type Changed' },
    { value: 'Cancelled Alarm', viewValue: 'Cancelled Alarm' },
    { value: 'Customer Note', viewValue: 'Customer Note' },
    { value: 'Dispatch Note', viewValue: 'Dispatch Note' },
    { value: 'Email Data', viewValue: 'Email Data' },
    { value: 'EParts Note', viewValue: 'EParts Note' },
    { value: 'Equipment Change', viewValue: 'Equipment Change' },
    { value: 'General Note', viewValue: 'General Note' },
    { value: 'Initial Call Note', viewValue: 'Initial Call Note' },
    { value: 'Legacy Note Type', viewValue: 'Legacy Note Type' },
    { value: 'Logistics Note', viewValue: 'Logistics Note' },
    { value: 'Management Note', viewValue: 'Management Note' },
    { value: 'Move Call Note', viewValue: 'Move Call Note' },
    { value: 'New Alarm Set', viewValue: 'New Alarm Set' },
    { value: 'No Serial Number Found', viewValue: 'No Serial Number Found' },
    { value: 'Notification Acknowledge', viewValue: 'Notification Acknowledge' },
    { value: 'Parts Order Cancelled', viewValue: 'Parts Order Cancelled' },
    { value: 'Parts Order Complete', viewValue: 'Parts Order Complete' },
    { value: 'Parts Order Delete From Queue', viewValue: 'Parts Order Delete From Queue' },
    { value: 'Parts Order Not Ready', viewValue: 'Parts Order Not Ready' },
    { value: 'Parts Order Quote Is Ready', viewValue: 'Parts Order Is Ready' },
    { value: 'Parts Order Quote Request', viewValue: 'Parts Order Quote Request' },
    { value: 'Parts Order Ready', viewValue: 'Parts Order Ready' },
    { value: 'Parts Order Recalled', viewValue: 'Parts Order Recalled' },
    { value: 'Parts Order Release For Process', viewValue: 'Parts Order Release For Process' },
    { value: 'Parts Order Tracking Info', viewValue: 'Parts Order Tracking Info' },
    { value: 'Parts Orders', viewValue: 'Parts Orders' },
    { value: 'Parts Quoted Item Changed', viewValue: 'Parts Quoted Item Changed' },
    { value: 'Parts Tracking Note', viewValue: 'Parts Tracking Note' },
    { value: 'Portal Note', viewValue: 'Portal Note' },
    { value: 'Rate Note', viewValue: 'Rate Note' },
    { value: 'Ready To Pay Note', viewValue: 'Ready To Pay Note' },
    { value: 'Sales Note', viewValue: 'Sales Note' },
    { value: 'Shipping Note', viewValue: 'Shipping Note' },
    { value: 'Status Change', viewValue: 'Status Change' },
    { value: 'Stop Clock Change', viewValue: 'Stop Clock Change' },
    { value: 'TAG Note', viewValue: 'TAG Note' },
    { value: 'Tech Support Note', viewValue: 'Tech Support Note' },
    { value: 'Technician Entered Note', viewValue: 'Technician Entered Note' },
    { value: 'Temp Equipment Created', viewValue: 'Temp Equipment Created' },
    { value: 'Travel Rate Change', viewValue: 'Travel Rate Change' },
    { value: 'Warning Message', viewValue: 'Warning Message' },
  ]




  // Define a function to filter users based on input value
  filterUsers(value: string) {

    const filterValue = value.toLowerCase();

    return this.allUsers?.filter((user: any) => user.username.toLowerCase().indexOf(filterValue) === 0);
  }
  /* onSupervisorFocus() {
    this.filteredUsers = this.filterUsers('');
  } */
  showOptions() {
    this.filteredUsers = this.allUsers;
  }


  goBack() {
    this.router.navigateByUrl('/main/user-list');
  }
}
