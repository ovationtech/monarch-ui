import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { ServiceCallBoardComponent } from '../service-call-board/service-call-board.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-appt-dialog',
  templateUrl: './appt-dialog.component.html',
  styleUrls: ['./appt-dialog.component.scss']
})
export class ApptDialogComponent implements OnInit {
  @ViewChild('form') appointmentFormRef!: ElementRef;
  selectedOption = 1;
  appointmentForm!: FormGroup; 
 
  userId: any;
  techi: any;
  isProgress: boolean | undefined;
  isUpdateMode = false;
  dataSource: any;
  paginator: any;
  showForm: boolean | undefined;
  showWorkOrderForm: boolean | undefined;
  selectedRow: any;
  originalFormValues: any;
  arr:  any[]= [];
  workOrderForm!:  FormGroup; 
  dataSources: any;
  serial: any;
  showSlaTracker: boolean | undefined;
  showPartsForm=false;
  techList:any;
  slaTrackerForm!: any;
  element: any;
  selectedId: any;
  partsForm: any;
  isCreateTempEquipmentSelected: boolean | undefined;
  cdr: any;
  isOrderPartsSelected: boolean | undefined;

  SSSSdata :any;
  registerform: any;
  lataSource: any;



  
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ServiceCallBoardComponent>,
    private userDataService: UserService,
    private dataService: DataService) { 
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id
    console.log("------------------",this.userId)
    this.showWorkOrderForm = false;
    this.showSlaTracker=false;
    this.showPartsForm=false;


//Apppointment list api for displaying in table 
    
    this.dataService.getAppointmentLists({user_id:this.userId,service_call_id:this.data?.id}).subscribe((data: any) => {
      console.log("Appointments lists---------------",data)
      this.techList = data
      console.log("++++++++++++++++++++++++++++",this.data)
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


/*     getAppointmentLists(): void {
      this.dataService.getAppointmentLists({user_id: this.userId, service_call_id: this.data?.id}).subscribe((data: any) => {
        console.log("Appointments lists---------------", data)
        console.log("++++++++++++++++++++++++++++", this.data)
        this.dataSource = new MatTableDataSource(data);
        this.isProgress = true;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); */
    
      // Set up an interval to fetch the appointments list every 5 seconds
     /*  setInterval(() => {
        this.dataService.getAppointmentLists({user_id: this.userId, service_call_id: this.data?.id}).subscribe((data: any) => {
          console.log("Appointments lists---------------", data)
          this.dataSource.data = data;
        });
      }, 500); */
    
    
  
  
    }
    datas: any = {
      key: [ 'serial','id', 'appointment_status', 'added_on','tech_long_name','eta_from','onsite_time','offsite_time','onsite_duration_mins','rate','action'],
      name: ['serial','Appt', 'Status', 'Date','Tech','ETA','OnSite','OffSite','Dur','Rate','Action'],
      link: ['id']
    };
    
 
    latas: any = {
      key: [ 'note_ts', 'note_text', 'added_by_username'],
      name: ['Added on', 'Changes', 'Done By'],
      link: ['']
    };
    //@ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    applyFiltern(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.lataSource.filter = filterValue.trim().toLowerCase();

      if (this.lataSource.paginator) {
        this.lataSource.paginator.firstPage();
      }
    }
    

    
  

    

  ngOnInit(): void {
    console.log("========================",this.data.id)
    this.appointmentForm = this.fb.group({
      technician_id: [''],
      appointment_status: [''],
      appointment_number: [this.userId],
      service_date: [null],
     
      onsiteRate: [null],
      travelRate: [null],
      rateAdjust: [null],
      pageCount: [null],
      etaDate: [null],
      etaFromTo: [''],
      //onsite_time: [null],
      offsite: [null],
      travelMiles: [null],
      travelHrs: [null],


      id:[this.data?.id],
      service_call_number: [this.data?.id],
      //technician: [null],
      travelrate: [''],
      travel_rate_type: [''],
      page_count: [null],
      eta_date: [null],
      eta_from: [''],
      eta_to: [''],
      onsite_time: [''],
      offsite_time: [''],
      travel_hours: [''],
      travel_miles: [''],
      audit: [''],
      audit_note: [''],      
      difficulty: [''],
      rate: [''],
      rate_type: [''],
      rate_adjust: [''],
      rate_adjust_reason: [''],
      isactive: [true],
      user_id: [this.userId],
      audit_resolution_note:[''],
      enable_audit:[''],
      resolved_audit:[''],
      audit_resolved:[''],
      critical_note:[''],
      appointment_note_arr:[this.arr]
    });
   
   this.workOrderForm=this.fb.group({
   postToExternalPlatform: false,
   id:[this.selectedId],
   eom_template: [''],
   process: [''],
   eom_date_1: [''],
   eom_date_2: [''],
   eta_from: [''],
   eta_to: [''],
   eta_date: [''],
   eta_time: [''],
   instructions: [''],
   post_to_external_platform: [false],
   representing:[''],
   user_id:[this.userId],
   eom_status:[''],
   service_call_number:[this.data.id],
   appointment_note_arr:[this.arr]
                  })


this.slaTrackerForm = this.fb.group({
technician_id: [''],
id:[''],
onsite_time: [''],
offsite_time: [''],
onsite_date:[''],
offsite_date:[''],
sla_1: [''],
sla_2: [''],
user_id: [this.userId]

                  });



 this.partsForm = this.fb.group({
   technician_id: [''],
   stage:[''],
   id:[''],
   order_status:[''],
   order_is_ready:[''],
   quote_is_ready:[''],
   shipping_is_ready:[''],
   delivered:[''],
   recovery_complete:[''],
   usage_complete:[''],
   order_complete:[''],
   submitted_by:[''],
   button_toggle: [''],
   prepared_by:[''],

   
   user_id: [this.userId]
   
                                      });



 this.registerform = this.fb.group({
   // id: [''],
   config_id: [''],
   equipment_id: [''],
   serial_number: [''],
                                    
   page_count_required: [''],
   model: [''],
   manufacturer: [''],
   part_number: [''],
   part_name: [''],
   part_note: [''],
   part_temp_flag: [''],
   part_name_changed_flag: [''],
   prev_part_name: [''],
   added_by: [''],
   added_on: [''],
   modified_by: [''],
   modified_on: [''],
   supplier:[''],
   recover:[''],
   Ready:[''],
   Quote:[''],
   isactive: [''],
   user_id:[this.userId]
                                                                         
        });

                
              


    const tech={user_id:this.userId}
    this.dataService.gettechnician(tech).subscribe((res: any) => {
      
      console.log(res)
      this.techi = res
     
      console.log("technician data-------------------------------------",res)
    })
    const appoi={user_id:this.userId}
    this.dataService.gettechnician(appoi).subscribe((res: any) => {
      
      console.log(res)
      this.techi = res
     
      console.log("technician data-------------------------------------",res)
    })
    


    const techa = { user_id: this.userId,service_call_id:this.data?.id,note_type:'APPOINTMENT' }
    this.dataService.getApppointmentNotes(techa).subscribe((res: any) => {
      this.lataSource = new MatTableDataSource(res);
      this.isProgress = true;
      this.lataSource.paginator = this.paginator;
      this.lataSource.sort = this.sort;
      console.log(res)
      this.techi = res

      console.log("-------------------------------------------------------lllllllllll data-------------------------------------", res)
    })

       // Subscribe to valueChanges of each form control
      /*  Object.keys(this.appointmentForm.controls).forEach(key => {
        this.appointmentForm.controls[key].valueChanges.subscribe(value => {
          if (value !== this.originalFormValues[key]) {
            // Value has changed, log the user id and updated value
            console.log(`-------------------0000000000000000000000000000000000000000000000000000000User ${this.userId} changed ${key} to ${value}`);
          }
        });
      }); */


   /*  const techa = { user_id: this.userId,call_number:this.data?.id }
    this.dataService.getserviceCallNotes(techa).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   

      console.log(res)
      this.techi = res

      console.log("-------------------------------------------------------lllllllllll data-------------------------------------", res)
    }) */
    



   
  }

  proceedregister(){}

  toggleForm() {
    console.log("this.data.technician_id-----",this.techList)
    
    this.showForm = !this.showForm;
    this.appointmentForm.reset();
    this.isUpdateMode=false;
    this.showWorkOrderForm=false;

     // Set the value of the service_call_number field to its current value
  this.appointmentForm.patchValue({ service_call_number: this.data?.id });
  this.appointmentForm.patchValue({ isactive: true });
  this.appointmentForm.patchValue({ appointment_number: this.userId });
  this.appointmentForm.patchValue({ user_id: this.userId });
  this.appointmentForm.patchValue({ technician_id: this.techList[0].technician_id });
  this.appointmentForm.patchValue({ rate: this.techList[0].rate,onsiteRate: this.techList[0].onsiteRate,rate_adjust: this.techList[0].rate_adjust,rate_type: this.techList[0].rate_type });



 
}

toggleWorkOrderForm(element: {
  tech_long_name: string; id: any; 
}) {
  
  this.workOrderForm.patchValue({id: this.selectedId});
  this.showWorkOrderForm = true;
  this.selectedId=element.id
  alert('workiiing'+this.selectedId+"-----------------------"+this.data.id)
  /* this.showWorkOrderForm= !this.showWorkOrderForm; */
  console.log("-----------------------------",this.workOrderForm)
  
  alert('workiiing....SLA tracker' + element.tech_long_name+element.id)
  const tech = this.techList.find((tech: { id: any; }) => tech.id === element.id);
  if (tech) {
    this.workOrderForm.patchValue({ eom_status: tech.eom_status ,id:tech.id,representing:tech.representing,post_to_external_platform:tech.post_to_external_platform,instructions:tech.instructions,eta_time:tech.eta_time,eta_date:tech.eta_date,eta_to:tech.eta_to,eta_from:tech.eta_from,eom_date_2:tech.eom_date_2,eom_date_1:tech.eom_date_1,process:tech.process,eom_template:tech.eom_template});
  }
  this.originalFormValues = {...this.workOrderForm.value};

 
  //this.workOrderForm.reset();
  //this.isUpdateMode=false;
}


toggleSlaTracker(element: {
  tech_long_name: string; id: any; 
}) {

  this.showSlaTracker= true;
  this.showForm=false;
  this.showWorkOrderForm=false;
  this.selectedId=element.id
  //this.slaTrackerForm.patchValue({ onsite_time:  this.element.onsite_time });
  alert('workiiing....SLA tracker' + element.tech_long_name+element.id)
  const tech = this.techList.find((tech: { id: any; }) => tech.id === element.id);
  
  if (tech) {
    
  const onsiteTime = tech.onsite_time;
  const date = new Date(onsiteTime);

  const offsiteTime=tech.offsite_time
  const offdate= new Date(offsiteTime)
  const offyear = offdate.getFullYear();
  const offmonth = (offdate.getMonth() + 1).toString().padStart(2, '0');
  const offday = offdate.getDate().toString().padStart(2, '0');
  const offhours =offdate.getUTCHours().toString().padStart(2, '0');
  const offminutes = offdate.getUTCMinutes().toString().padStart(2, '0');
  const offformattedTime = `${offhours}:${offminutes}`;
  const offformattedDate = `${offyear}-${offmonth}-${offday}`;
  
  
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  const formattedDate = `${year}-${month}-${day}`;
  
    this.slaTrackerForm.patchValue({ onsite_time:formattedTime ,technician_id:tech.tech_long_name,offsite_time:offformattedTime,offsite_date:offformattedDate,sla_2:tech.sla_2,sla_1:tech.sla_1,onsite_date:formattedDate});
    this.originalFormValues = {...this.slaTrackerForm.value};
  }
  
  alert('workiiing....SLA tracker' + element.tech_long_name+element.id)
  console.log("-----------------------------",this.slaTrackerForm)
  
  
  
}

togglePartsform(element: any){
  alert("EEEEE")

    /* this.SSSSdata = element */
  
  this.showPartsForm = !this.showPartsForm;

  this.dataService.getequippartsorder({user_id:this.userId}).subscribe((datas: any) => {
    console.log("#################################################3",this.data.eq_master_id)
    this.datas = datas;
    const dataWithEqMasterId = this.datas.find((c: any) => c.id === this.data.eq_master_id)
    console.log("Data with eq_master_id:--------------------------------", dataWithEqMasterId);
    this.registerform.patchValue(dataWithEqMasterId);

    });
    



}

  onRowClick(rowData: any): void {
    // Patch the row data into the appointmentForm
 
   
    this.showForm = !this.showForm;
    this.isUpdateMode = true;
    console.log("-----------------working")
    const a=this.appointmentForm.patchValue({...rowData,rate_adjust:rowData.rate
    
        });
    console.log("=================================================",this.appointmentForm.value)
    console.log("=====================================================+++++++++++++++++",a)
     // Store original form values after patching
     this.originalFormValues = {...this.appointmentForm.value};
  }
  /* onIdClick(id: number): void {
    const row = this.data.find((element: { id: number; }) => element.id === id);
    console.log("pppppppppppppppppppppppppppppppppppppppppp",row);
  } */
  

  
  



  close(): void {
    this.dialogRef.close();
  }
  


 /*  deleteAppointment(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert("deleted")
        const appts = {user_id:this.userId,id:element.id,isactive:false};
        this.dataService.deleteAppointment(appts).subscribe((res: any) => {
          console.log("delete appointment response----", appts);
        });
      }
    });
  } */


  deleteAppointment(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this appointment?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const appts = { user_id: this.userId, id: element.id, isactive: false,service_call_number:this.data.id };
        this.dataService.deleteAppointment(appts).subscribe((res: any) => {
          console.log("delete appointment response----", appts);
          // Remove the deleted appointment from the appointments array
          this.arr.push(`deleted the Appointment of appointment id ${appts.id} `)
          console.log("here isss uuuuuuuur aryyyyyyyyyyyyyyyyyy-------------",this.arr)

        




        });
      }
    });
  }
  
  
  
  
  
  
  
  
  addAppointment() {
    
    const newAppointment = this.appointmentForm.value;
    console.log("-----------------Appt.--",newAppointment)
    this.dataService.insertAppointment(newAppointment).subscribe((res: any) => {
      console.log("Insert appointment response----",res)
     this.arr.push(`added the new appointment `)
    
    })}


   
    
    updateAppointment() {
      // call update appointment API here
    

   
    
    const updatedValues=this.appointmentForm.value;
    alert("workingggggg"+updatedValues)
    this.appointmentForm.patchValue(updatedValues);
    console.log("--------------------------------",updatedValues)

    // Store the new form values
    const newFormValues = {...this.appointmentForm.value};
    const id = this.appointmentForm.get('id')?.value;
 

    // Compare the new form values to the original values
    Object.keys(newFormValues).forEach(key => {
      if (newFormValues[key] !== this.originalFormValues[key]) {
        
        this.arr.push(`Changed ${key} to ${newFormValues[key]} of appointment id ${id} `)
        // Value has changed, log the user id and updated value
        console.log(`appt id a ${id}  User ${this.userId} changed ${key} to ${newFormValues[key]}`);
      }
     
    

    
    });
    console.log('Array--------',this.arr)

    const newaptt = this.appointmentForm.value;
    console.log("-----------------Appt.--",newaptt)
    this.dataService.updateAppointments(newaptt).subscribe((res: any) => {
      console.log("update appointment response----",res)
    })
    }
    onSubmitWorkOrder(){
      alert("wooooorrrrrrkkkkkkkppppppppppppppppp"+this.selectedId)
      const workorder=this.workOrderForm.value
      this.workOrderForm.patchValue({id: this.selectedId});
      const id = this.workOrderForm.get('id')?.value;
    
      console.log("------------------",this.workOrderForm.value)

      const newFormValues = {...this.workOrderForm.value};
     
       // Compare the new form values to the original values
      Object.keys(newFormValues).forEach(key => {
      if (newFormValues[key] !== this.originalFormValues[key]) {
        
        this.arr.push(`Changed workorder ${key} to ${newFormValues[key]} of appointment id ${id} `)
        // Value has changed, log the user id and updated value
        console.log(`appt id a ${id}  User ${this.userId} changed ${key} to ${newFormValues[key]}`);
      }});
      console.log('Array--------',this.arr)


      this.dataService.insertWorkOrderOfApptWorkOrder(workorder).subscribe((res: any) => {
        console.log("Insert workorder response----",res)
      })
      
      
    }
    onSubmitSlaTracker(){
      alert("wooooorrrrrrkkkkkkkppppppppppppppppp"+this.selectedId)
      this.slaTrackerForm.patchValue({id: this.selectedId});
      this.originalFormValues = {...this.slaTrackerForm.value};
      
      const id = this.workOrderForm.get('id')?.value;
      const onsiteDate = this.slaTrackerForm.get('onsite_date')?.value;
      const onsiteTime = this.slaTrackerForm.get('onsite_time')?.value;
      const offsiteDate = this.slaTrackerForm.get('offsite_date')?.value;
      const offsiteTime = this.slaTrackerForm.get('offsite_time')?.value;
      console.log("onsiteDate:-------------- ", onsiteDate);
      console.log("onsiteTime:---------------- ", onsiteTime);
    


     
     
      /* const combined_date_time = new Date(onsiteDate+ ' ' + onsiteTime) */
      /* const combined_off_date_time = new Date(offsiteDate + ' ' + offsiteTime) */

      const onsiteDateISO = new Date(onsiteDate).toISOString().substr(0, 10);
      const onsiteTimeFormatted = onsiteTime.padStart(5, '0');
      const offsiteDateISO = new Date(offsiteDate).toISOString().substr(0, 10);
      const offsiteTimeFormatted = offsiteTime.padStart(5, '0');



      const combinedDateTimeString = onsiteDateISO + 'T' + onsiteTimeFormatted + ':00.000Z';
      const combined_date_time = new Date(combinedDateTimeString);
      const combinedoffDateTimeString = offsiteDateISO + 'T' + offsiteTimeFormatted + ':00.000Z';
      const combined_off_date_time = new Date(combinedoffDateTimeString);
     

     


      console.log("combined_date_time:---------------- ", combined_date_time);
        
        this.slaTrackerForm.patchValue({ onsite_time:  combined_date_time ,offsite_time: combined_off_date_time});

        const tracker=this.slaTrackerForm.value
    
      console.log("--------------------",tracker)
      this.dataService.updateSlaTracker(tracker).subscribe((res: any) => {
        console.log("update sla tracker----",res)



        const newFormValues = {...this.slaTrackerForm.value};
     
       // Compare the new form values to the original values
       Object.keys(newFormValues).forEach(key => {
       if (newFormValues[key] !== this.originalFormValues[key]) {
        
        this.arr.push(`Changed workorder ${key} to ${newFormValues[key]} of appointment id ${id} `)
        // Value has changed, log the user id and updated value
        console.log(`appt id a ${id}  User ${this.userId} changed ${key} to ${newFormValues[key]}`);
        }});
      console.log('Array--------',this.arr)
       }
      )

    }


    onButtonToggleChange(value: string) {
      if (value === 'create_temp_equipment') {
        this.isCreateTempEquipmentSelected = this.isCreateTempEquipmentSelected ? false : true;
      }

      if (value === 'parts_order') {
        this.isOrderPartsSelected = this.isOrderPartsSelected ? false : true;
      }
    }
    
  

    onSubmit() {
      if (this.isUpdateMode) {
        this.updateAppointment();
      } else {
        this.addAppointment();
      }
    }
}
