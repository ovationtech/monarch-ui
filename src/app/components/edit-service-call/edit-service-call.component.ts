



import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-edit-service-call',
  templateUrl: './edit-service-call.component.html',
  styleUrls: ['./edit-service-call.component.scss']
})
export class EditServiceCallComponent implements OnInit {
  @ViewChild('locationNotesTextarea') locationNotesTextarea: ElementRef | any
  //@ViewChild('pickert') pickert: NgxMatDatetimePicker<any> | undefined;
  @ViewChild('equipmentNotesTextarea') equipmentNotesTextarea: ElementRef | any
  @ViewChild('customerInput') customerInput!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  datas: any = {
    key: [ 'note_ts', 'note_text', 'added_by_username'],
    name: ['Added on', 'Changes', 'Done By'],
    link: ['']
  };

  serviceCallForm!: FormGroup;
  userId: any;
  customerName: any;
  customers: any;
  locations: any;
  allUsers: any;
  equi: any;
  techi: any;
  filteredCustomer: any;
  filterCustomers: any;
  stateCtrl = new FormControl('');
  filteredStates!: Observable<any>;
  selectedCustomerName: any;
  allCustomers: any;
  equipment: any;
  customerdata: any;
  filteredEquipment: any;
  locationNotes: any;
  EquipmentNotes: any;
  filteredList5: any;
  flag: any = true;
  isProgress: boolean | undefined;
  originalFormValues: any;
  arr: any[]= [];

  created: string = "john";
  constructor(public dialogRef: MatDialogRef<EditServiceCallComponent>,private fb: FormBuilder, private dataService: DataService, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,) {

    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id
    console.log("------------------", this.userId)
    //#############################################################################################
    //TABLE DATA
   /*  this.userService.getUsers1()?.subscribe((datas: any) => {
      console.log(datas)
     

    }) */
    //##############################################################################################


    console.log("Form-data-----------", this.data)


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  ngOnInit(): void {
    this.dataService.getcustomerData({ user_id: this.userId }).subscribe((data: any) => {




      console.log("Customer lists---------------", data.result)
      this.customers = data.result
    });



    //==============================================================================================
    //==============================================================================================

    const obji = {
      user_id: this.userId,
      status_of_call: "Open Calls"
    }

    this.dataService.getServiceCallsByStatus(obji).subscribe((data: any) => {
      // console.log(data)

      console.log("##############", data)

    })
    //===================================================================================================     
    this.userService.getUsers1().subscribe((res: any) => {
      console.log(res)
      this.allUsers = res
      res.forEach((obj: { username: any; }) => {
        console.log(obj.username);
      });
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4", res)
    })
    const tech = { user_id: this.userId }
    this.dataService.gettechnician(tech).subscribe((res: any) => {

      console.log(res)
      this.techi = res

      console.log("technician data-------------------------------------", res)
    })


    this.dataService.getequip(tech).subscribe((res: any) => {

      console.log(res)
      this.equipment = res
      // this.filteredList5 = this.equipment.slice();

      console.log("equipment --------- data-------------------------------------", res)
    })
   
   this.serviceCallForm = this.fb.group({
      id: [null],
      customer_id: [, Validators.required],
      location_id: [],
      technician_id: [],
      eq_master_id: [, Validators.required],
      service_description: ["", Validators.required],
      type_call_short: ["", Validators.required],
      call_owner: ["", Validators.required],
      contact_name: ["", Validators.required],
      contact_phone: ["", Validators.required],
      contact_phone_ext: [""],
      contact_email: ["", Validators.required],
      customer_call_id: ["", Validators.required],
      date_of_service_call: ["", Validators.required],
      priority_of_call: ["", Validators.required],
      status_of_call: ["", Validators.required],
      special_notes: [""],
      isactive: [true],
      user_id: [this.userId],
      HP_Work_Order: [''],
      address: ['', Validators.required],
      call_date: ['', Validators.required],
      purchase_order: ['', Validators.required],
      cust_ref_no: ['', Validators.required],
      invoice: [''],
      initial_alarm: [''],
      location_notes: ['', this.locationNotes],
      equipment_notes: ['', this.EquipmentNotes],
      contract_notes: [''],
      tag: [''],
      tech_support: [''],
      logistic: [false],
      appointment_status:[''],
      appointment_id:[],
      service_call_note_arr:[this.arr],
      alarm_time:[],
      alarm_date:[],
      alarm_set_time:[],


    });
    
    

    this.serviceCallForm.patchValue(this.data)
    this.serviceCallForm.patchValue({location_id:this.data?.location_name})
    this.serviceCallForm.patchValue({customer_id:this.data?.customer_name})
    this.serviceCallForm.patchValue({eq_master_id:this.data?.serial_number})
    this.serviceCallForm.patchValue({address:this.data?.location_name})
    
    const techa = { user_id: this.userId,call_number:this.data?.id }
    this.dataService.getserviceCallNotes(techa).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   

      console.log(res)
      this.techi = res

      console.log("-------------------------------------------------------lllllllllll data-------------------------------------", res)
    })
   /*  setTimeout(() => {
      console.log('Delayed function called.');
      this.onCustomerChange()
    }, 3000) */

   /*  const s_id = 1;
    const obja = { user_id: this.userId };
    this.dataService.getservicecalldata(obja).subscribe((response: any) => {
      const dataa = response.data; // Assuming the array of objects is stored in a property named 'data'
      console.log("++++++++++++++++++++++++++++++++++++++++++++", response)

      const objToPatch = dataa.find((obj: { id: number; }) => obj.id === s_id);
      console.log("=========================================", objToPatch)

      if (objToPatch) {
        this.serviceCallForm.patchValue(objToPatch);
        // Patch the form with all the values from the object
      }
    }); */
    // Store original form values after patching
    this.originalFormValues = {...this.serviceCallForm.value};
    
    // Subscribe to valueChanges of each form control
      Object.keys(this.serviceCallForm.controls).forEach(key => {
        this.serviceCallForm.controls[key].valueChanges.subscribe(value => {
          if (value !== this.originalFormValues[key]) {
            // Value has changed, log the user id and updated value
            console.log(`-------------------0000000000000000000000000000000000000000000000000000000User ${this.userId} changed ${key} to ${value}`);
          }
        });
      });
      // Call this function whenever the user updates the form
    
    


/* 
    this.serviceCallForm.get('location_id')?.valueChanges.subscribe(() => {

      this.onlocationchange();
      if (this.flag)

        this.onCustomerAndLocationChange();
      this.flag = false;
    }); */

    this.serviceCallForm.get('eq_master_id')?.valueChanges.subscribe(() => {

      if (this.flag)
        this.onEquipmentChange();

      this.flag = false

    });


  }
  updateForm() {
    // Update the form values
    const updatedValues=this.serviceCallForm.value;
    this.serviceCallForm.patchValue(updatedValues);
    console.log("--------------------------------",updatedValues)

    // Store the new form values
    const newFormValues = {...this.serviceCallForm.value};

    // Compare the new form values to the original values
    Object.keys(newFormValues).forEach(key => {
      if (newFormValues[key] !== this.originalFormValues[key]) {
        this.arr.push(`Changed ${key} to ${newFormValues[key]}`)
        // Value has changed, log the user id and updated value
        console.log(`User ${this.userId} changed ${key} to ${newFormValues[key]}`);
      }
    });
    console.log('Array--------',this.arr)
  }
 
  selectedCustomerId: any;
 /*  onCustomerChange() {


    this.selectedCustomerId = this.serviceCallForm.get('customer_id')?.value;
    console.log("******************", this.selectedCustomerId)
    const customer = this.customers.find((c: { customer_id: number; }) => c.customer_id === this.selectedCustomerId);

    if (customer) {

      this.serviceCallForm.get('customer_id')?.setValue(customer.customer_name);
      this.locations = customer.locationd_details;


    } else {
      console.log("Customer not found");
    }
    this.onCustomerAndLocationChange()
  } */


  filterCustomer(value: string) {

    const filterValue = value.toLowerCase();


    return this.customers?.filter((customer: any) => customer.customer_name.toLowerCase().indexOf(filterValue) === 0);
  }
  filterEquipment(value: string) {

    const filtereValue = value.toLowerCase();

    return this.equipment?.filter((equip: any) => equip.serial_number.toLowerCase().indexOf(value) === 0);
  }
  onInput(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredCustomer = this.filterCustomer(filterValue);
  }
  onEnput(event: any) {
    const filtereValue = event.target.value.toLowerCase();
    this.filteredEquipment = this.filterEquipment(filtereValue);
  }



  showOptions() {
    this.filteredCustomer = this.customers;
  }

  showOptionsssss() {
    this.filteredEquipment = this.equipment;
    console.log("filteredEquipmentfilteredEquipmentfilteredEquipmentfilteredEquipmentfilteredEquipment----", this.filteredEquipment)
  }

  slectedEquipId: any;

  onEquipmentChange() {

    const equipdata = this.serviceCallForm.get('eq_master_id')?.value;
    const eq = { user_id: this.userId, equip_id: equipdata }
    const eqi = this.equipment.find((c: { id: number; }) => c.id === equipdata);
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh------------------", eqi)
    this.slectedEquipId = eqi.id
    this.serviceCallForm.get('eq_master_id')?.setValue(eqi.serial_number);


    this.dataService.getEqupipmentNotes(eq).subscribe((note: any) => {
      console.log("Equipment notes----------------------", note)
      this.equipmentNotesTextarea.nativeElement.value = note[0].equip_note



    });
  }

    /* this.dataService.getcusloc(eq).subscribe((res: any) => {
      console.log(";;;;;;;;;;;;;;;;;;;=============", res)
      const customer_id = res.customer_id;
      const location_id = res[0].location_id;

      this.serviceCallForm.patchValue({
        customer_id: res[0].customer_id
      });
      this.onCustomerChange()
      // Set the customer_id and location_id values in the form
      setTimeout(() => {
        console.log('Delayed function called.');
        this.serviceCallForm.patchValue({ location_id: res[0].location_id });
      }, 2000)


    })
  } */
  // selectEquip() {
  //   const equipdata = this.serviceCallForm.get('eq_master_id')?.value;
  //   const eq = { user_id: this.userId, equip_id: equipdata }
  //   const eqi = this.equipment.find((c: { id: number; }) => c.id === equipdata);
  //   console.log("12222222------------------", eqi)
  //   this.slectedEquipId = eqi.id
  //   this.serviceCallForm.get('eq_master_id')?.setValue(eqi.serial_number);
  // }


/*   onCustomerAndLocationChange() {
    const customerId = this.serviceCallForm.get('customer_id')?.value;
    const location = this.serviceCallForm.get('location_id')?.value;

    if (customerId && location) {
      const obj = {
        customer_id: this.selectedCustomerId,
        location_id: location,
        user_id: this.userId,

      }

      console.log("passsssssssssssssssssssssssssssssssssssssssss", obj)

      this.dataService.getequipment(obj).subscribe((equ: any) => {
        this.equipment = equ
        this.serviceCallForm.patchValue({ eq_master_id: equ[0].id })
        console.log("Equipment data-------------------------------------------", equ);

      });
    }

  } */
  


/*   onlocationchange() {

    const location = this.serviceCallForm.get('location_id')?.value;

    const obj = {
      id: location,
      user_id: this.userId,
    }
    this.dataService.getLocationNotes(obj).subscribe((note: any) => {
      this.locationNotesTextarea.nativeElement.value = note[0].notes

      console.log("Location notes----------------------", note);

    })


  } */
  onSubmit() {
    // if (this.serviceCallForm.invalid) {
    //   re

    const alarm_time = this.serviceCallForm.get('alarm_time')?.value
    const alarm_date = this.serviceCallForm.get('alarm_date')?.value
    const combined_date_time = new Date(alarm_date.toDateString() + ' ' + alarm_time)
    console.log("Alarm date time----",alarm_time, alarm_date, combined_date_time)

    this.serviceCallForm.patchValue({alarm_set_time:combined_date_time})


    this.updateForm()
    console.log(";;;;;;;;;;;;;;;;;;;;;;;====", this.slectedEquipId)
    this.serviceCallForm.patchValue({ customer_id: this.selectedCustomerId, eq_master_id: this.slectedEquipId })

    const formValues = this.serviceCallForm.value;
    console.log("Service call data---", formValues)
    this.dataService.updateserviceCall(formValues).subscribe((response: any) => {
      console.log("Responce-----", response)
    });
    this.dialogRef.close();
  }


  showequipOptions() {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", this.equipment)
    this.filteredEquipment = this.equipment;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2", this.filteredEquipment)
  }


}








  function updateForm() {
    throw new Error('Function not implemented.');
  }

