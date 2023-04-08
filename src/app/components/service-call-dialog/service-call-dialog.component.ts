import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import {Observable} from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-call-dialog',
  templateUrl: './service-call-dialog.component.html',
  styleUrls: ['./service-call-dialog.component.scss']
})
export class ServiceCallDialogComponent implements OnInit {
  @ViewChild('locationNotesTextarea') locationNotesTextarea: ElementRef | any
  @ViewChild('equipmentNotesTextarea') equipmentNotesTextarea: ElementRef | any
  @ViewChild('customerInput') customerInput!: ElementRef;

  serviceCallForm!: FormGroup; 
  userId: any;
  customerName: any;
  customers: any;
  data: any;
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
  flag:any=true;
  private isEquipmentChangeInProgress = false;

  constructor(private fb: FormBuilder,private dataService: DataService,private userService: UserService, @Inject(MAT_DIALOG_DATA) public eqDataNcall: any) {

    console.log("Data for new call----",eqDataNcall)
    
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id
    console.log("------------------",this.userId)

    // this.filteredStates = this.serviceCallForm.get('customer_id')?.valueChanges.pipe(
    //   startWith(''),
    //   map(state => (state ? this._filterStates(state) : this.customers.slice())),
    // );

    // this.filteredStates = this.serviceCallForm.get('customer_id')

    // private _filterStates(value: string): {
    //   const filterValue = value.toLowerCase();
  
    //   return this.customers.filter(state => state.name.toLowerCase().includes(filterValue));
    // }
    
    
  
  }

 


  ngOnInit(): void {
    this.dataService.getcustomerData({user_id:this.userId}).subscribe((data: any) => {
     

     
      
      console.log("Customer lists---------------",data.result)
      this.customers=data.result
     });
      
    this.userService.getUsers1().subscribe((res: any) => {
      console.log(res)
      this.allUsers = res
      res.forEach((obj: { username: any; }) => {
        console.log(obj.username);
      });
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4",res)
    })
    const tech={user_id:this.userId}
    this.dataService.gettechnician(tech).subscribe((res: any) => {
      
      console.log(res)
      this.techi = res
     
      console.log("technician data-------------------------------------",res)
    })
  
    
    this.dataService.getequip(tech).subscribe((res: any) => {
      
      console.log(res)
      this.equipment = res
      // this.filteredList5 = this.equipment.slice();
     
      console.log("equipment --------- data-------------------------------------",res)
    })
  
    // const equipdata={user_id:this.userId,equip_id:this.equipment.id}
    // this.dataService.getcusloc(equipdata).subscribe((res: any) => {
      
    //   console.log(res)
    //   this.customerdata = res
     
    //   console.log("equipment --------- data-------------------------------------",res)
    // })
    
   



    
   
    
    this.serviceCallForm = this.fb.group({
     
      customer_id: [,Validators.required],
      location_id: [,Validators.required],
      technician_id: [,Validators.required],
      eq_master_id: [,Validators.required],
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
      HP_Work_Order:[''],
      


      // call_number: ['', Validators.required],
      // problem: ['', Validators.required],
      // customer_id: ['', Validators.required],
      // location: ['', Validators.required],
      address: ['', Validators.required],
      // contact: ['', Validators.required],
      // phone: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      call_date: ['', Validators.required],
      // call_type: ['', Validators.required],
      purchase_order: ['', Validators.required],
      priority: ['', Validators.required],
      cust_ref_no: ['', Validators.required],
      // owner: ['', Validators.required],
      invoice: [''],
      // technician: [''],
      // equipid: [''],
      initial_alarm: [''],
      // call_status: [''],
      // special_note: [''],
      location_notes: ['',this.locationNotes],
      equipment_notes: ['',this.EquipmentNotes],
      contract_notes: [''],
      tag:[''],
      tech_support:[''],
      logistic:[false],
      appointment_status:[''],
      // audit_entire_call:[false],
      // service_date:[]
    });

    


    this.serviceCallForm.get('customer_id')?.valueChanges.subscribe(() => {
      // this.onCustomerAndLocationChange();
    });
  //TESTING##################3  
    
    this.serviceCallForm.get('location_id')?.valueChanges.subscribe(() => {
    
      this.onlocationchange();
      if (this.flag)
        
        this.onCustomerAndLocationChange();
        this.flag = false;
    });
    
    this.serviceCallForm.get('eq_master_id')?.valueChanges.subscribe(() => {
      
      if (this.flag)  
        this.onEquipmentChange();

        this.flag = false

    }); 


    // Set the customer_id and location_id values in the form
    setTimeout(() => { 
      console.log('Delayed function called.');
      this.serviceCallForm.patchValue({eq_master_id:this.eqDataNcall.id})
     }, 3000)


 /*    this.serviceCallForm.get('location_id')?.valueChanges.subscribe(() => {
      // Check if the equipment has already been selected
      const eqMasterId = this.serviceCallForm.get('eq_master_id')?.value;
      if (eqMasterId) {
        // Equipment has already been selected, so we only need to update the customer and location
        this.onlocationchange();
        this.onCustomerAndLocationChange();
      } else {
        // Equipment hasn't been selected yet, so we don't need to do anything
        // (onCustomerAndLocationChange will be executed when the equipment is selected)
      }
    });
    
    this.serviceCallForm.get('eq_master_id')?.valueChanges.subscribe(() => {
      // Check if the location has already been selected
      const locationId = this.serviceCallForm.get('location_id')?.value;
      if (locationId) {
        // Location has already been selected, so we only need to update the equipment
        this.onEquipmentChange();
      } else {
        this.onEquipmentChange();
        // Location hasn't been selected yet, so we don't need to do anything
        // (onEquipmentChange will be executed when the location is selected)
      }
    }); */
    
    



    /* this.serviceCallForm.get('location_id')?.valueChanges.subscribe(() => {
      this.onlocationchange();
      if (this.flag) {
        this.onCustomerAndLocationChange();
        this.flag = false;
      }
    });
    
    this.serviceCallForm.get('eq_master_id')?.valueChanges.subscribe(() => {
      if (this.flag) {
        if (this.serviceCallForm.get('customer_id')?.value && this.serviceCallForm.get('location_id')?.value) {
          // Customer and Location fields are already set, so do not execute onCustomerAndLocationChange()
          this.onEquipmentChange();
        } else {
          // Customer and Location fields are not set yet, so execute onCustomerAndLocationChange()
          this.onCustomerAndLocationChange();
        }
        this.flag = false;
      } else {
        // Reset the customer and location fields to null
        this.serviceCallForm.get('customer_id')?.reset();
        this.serviceCallForm.get('location_id')?.reset();
      }
    }); */
    
    
    
    
    
    
    
    

    
  }
 /*  onCustomerChange() {
    const customerId = this.serviceCallForm.get('customer_id')?.value;
    // Call the API to get the locations for the selected customer
    console.log("###################################################################3",this.customers);
    
    const customerl = this.customers.find((c: { customer_id: number; }) => c.customer_id === customerId);
    
    this.locations=customerl.locationd_details;
      if (customerl) {
        console.log(customerl.locationd_details);
      } else {
        console.log("Customer not found");
      }
    
    } */
    selectedCustomerId:any;
    onCustomerChange() {
      this.selectedCustomerId = this.serviceCallForm.get('customer_id')?.value;
      const customer = this.customers.find((c: { customer_id: number; }) => c.customer_id === this.selectedCustomerId);
      
      if (customer) {
       
        this.serviceCallForm.get('customer_id')?.setValue(customer.customer_name);
        this.locations = customer.locationd_details;
        
      
      } else {
        console.log("Customer not found");
      }
    }
    

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
        console.log("filteredEquipmentfilteredEquipmentfilteredEquipmentfilteredEquipmentfilteredEquipment----",this.filteredEquipment)
      }
    
    slectedEquipId:any;
    
    onEquipmentChange() {
        const equipdata = this.serviceCallForm.get('eq_master_id')?.value;
        console.log("Equipment id-----"+equipdata)
        const eq={user_id:this.userId,equip_id:equipdata}
        const eqi = this.equipment.find((c: { id: number; }) => c.id === equipdata);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh------------------",eqi)
        this.slectedEquipId = eqi.id
        this.serviceCallForm.get('eq_master_id')?.setValue(eqi.serial_number);
         
        
        this.dataService.getEqupipmentNotes(eq).subscribe((note: any) => {
          console.log("Equipment notes----------------------",note)
          this.equipmentNotesTextarea.nativeElement.value=note[0]?.equip_note
                  

        
      });
      
        this.dataService.getcusloc(eq).subscribe((res: any) => {
          console.log(";;;;;;;;;;;;;;;;;;;=============",res)
          const customer_id = res.customer_id;
          const location_id = res[0].location_id;
          
          this.serviceCallForm.patchValue({
            customer_id:res[0].customer_id
          });
          this.onCustomerChange()
          // Set the customer_id and location_id values in the form
          setTimeout(() => { 
            console.log('Delayed function called.');
            this.serviceCallForm.patchValue({location_id:res[0].location_id});
           }, 2000)
           
           
      })
    }
    selectEquip(){
      const equipdata = this.serviceCallForm.get('eq_master_id')?.value;
      const eq={user_id:this.userId,equip_id:equipdata}
      const eqi = this.equipment.find((c: { id: number; }) => c.id === equipdata);
      console.log("12222222------------------",eqi)
      this.slectedEquipId = eqi.id
      alert("Equipment id11-----"+this.slectedEquipId)
      //this.serviceCallForm.get('eq_master_id')?.setValue(eqi.serial_number);
      alert("44444444444444444444444444444444444444444444"+this.slectedEquipId)
      this.onEquipmentChange()
    }
      

    onCustomerAndLocationChange() {
      const customerId = this.serviceCallForm.get('customer_id')?.value;
      const location = this.serviceCallForm.get('location_id')?.value;
      
      if (customerId && location){
        const obj={customer_id: this.selectedCustomerId,
          location_id: location,
          user_id: this.userId,

              }

        console.log("passsssssssssssssssssssssssssssssssssssssssss",obj)

        this.dataService.getequipment(obj).subscribe((equ: any) => {
          this.equipment=equ
          console.log("Equipment data-------------------------------------------", equ);

        });
      }
      
    }



    onlocationchange(){
      
      const location = this.serviceCallForm.get('location_id')?.value;
     
      const obj={
        id: location,
        user_id: this.userId,}
        this.dataService.getLocationNotes(obj).subscribe((note: any) => {
          this.locationNotesTextarea.nativeElement.value=note[0].notes

          console.log("Location notes----------------------",note);
    
  })


}
      onSubmit() {
      // if (this.serviceCallForm.invalid) {
      //   return;
      // }
      console.log(";;;;;;;;;;;;;;;;;;;;;;;====",this.slectedEquipId)
      this.serviceCallForm.patchValue({customer_id:this.selectedCustomerId, eq_master_id:this.slectedEquipId})
      
      const formValues = this.serviceCallForm.value;
     console.log("Service call data---",formValues)
      this.dataService.insertserviceCall(formValues).subscribe((response: any) => {
        console.log("Responce-----",response)        
      });
    }
    

    showequipOptions() {
      alert("WWWW")
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",this.equipment)
      this.filteredEquipment = this.equipment;
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2",this.filteredEquipment)
    }
    
    
  }





    function onCustomerAndLocationChange(): ((error: any) => void) | null | undefined {
      throw new Error('Function not implemented.');
}

