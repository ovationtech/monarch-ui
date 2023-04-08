import { Component, ViewChild,OnInit, Inject } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCallDialogComponent } from '../service-call-dialog/service-call-dialog.component';
// import { ServiceCallAlarmDialogComponent } from '../service-call-alarm-dialog/service-call-alarm-dialog.component';



import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-service-call-alarm',
  templateUrl: './service-call-alarm.component.html',
  styleUrls: ['./service-call-alarm.component.scss']
})
export class ServiceCallAlarmComponent {

  user: any;
  registerform!: FormGroup;
  myDatePicker:any;
  
  
  

  data: any = {
    key: ['service_call_number', 'alarm_value' , 'alarm_reason','set_by','set_for',  'set_time', 'ack', 'ack_by'],
    name: ['Service Call Number', 'ALarm Time', 'Alarm Reason','Set By', 'Set For','Set Time', 'ack', 'ack_by'],
    link:['service_call_number'],
    dateTime:['alarm_value']

  }

  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;

  constructor(private dataService: DataService, public dialog: MatDialog,private formBuilder: FormBuilder , private router: Router,
   ) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id



    this.dataService.getservicecallalarmalltData({user_id:this.userId, service_call_number:2}).subscribe((data: any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'id', start: 'desc', disableClear: true });
      for (let x of this.data.key)
        console.log("Datas list-----", x.key)
        console.log("Datas list-----", this.data.key[0].name)

    })




    this.registerform = this.formBuilder.group({

      service_call_number:[2],
      alarm_value: [''],
      set_for:['', Validators.required],
      alarm_reason: ['', Validators.required],
      
      cancelled: [''],
      cancel_reason: [''],
      
      added_by: [this.userId],
      isactive: [true],
      user_id:[this.userId],

      date:[''],
      time:['']
      

    })
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data:any) {
    console.log("technician data----",data)
    // const dialogRef = this.dialog.open(
    //   ServiceCallAlarmDialogComponent,
    //   {
    //     height: 'auto',
    //     width: '100%',
    //     disableClose: true,
    //     data: data
    //   }
    // );

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }




  proceedregister() {
       console.warn(this.registerform.get('date')?.value.toDateString())
       console.warn(this.registerform.get('time')?.value)
       let d = new Date(this.registerform.get('date')?.value.toDateString() + ' ' + this.registerform.get('time')?.value)
       console.log("Combined date and time---",d)
       console.log("Time---",d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())
       this.registerform.patchValue({alarm_value:d})
    if (this.registerform.valid) {
      this.dataService.insertservicecallalarm(this.registerform.value).subscribe((result: any) => {
        this.user = result
        console.warn(result)
        
      });


    }

  }
  

}
