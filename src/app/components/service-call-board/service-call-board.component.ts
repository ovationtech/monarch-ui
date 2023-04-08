import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ServiceCallDialogComponent } from '../service-call-dialog/service-call-dialog.component';
import { EditServiceCallComponent } from '../edit-service-call/edit-service-call.component';
import { ApptDialogComponent } from '../appt-dialog/appt-dialog.component';

@Component({
  selector: 'app-service-call-board',
  templateUrl: './service-call-board.component.html',
  styleUrls: ['./service-call-board.component.scss']
})
export class ServiceCallBoardComponent implements OnInit {

  data: any = {
    key: ['id', 'customer_name', 'location_name', 'tech_long_name', 'date_of_service_call', 'type_call_short', 'status_of_call', 'call_owner', 'action'],
    name: ['Call ID', 'Customer', 'Location', 'Technician', 'Date', 'Type', 'Status', 'Owner', 'Action'],
    link:['id'],

  }

  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;



  constructor(private dataService: DataService, public dialog: MatDialog ){
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id
  }

  ngOnInit(): void {
    console.log("Data------------------------------------------------------",this.data.date)
    const obj = {
      
      user_id: this.userId,
      status_of_call: "Open Calls"
    }
    this.dataService.getServiceCallsByStatus(obj).subscribe((data: any) => {
      // console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("##############",data)

    })
  }
 
  result:any;
  openAddServiceCall(element:any) {
    console.log("Update user data----",element)
    const dialogRef = this.dialog.open(ServiceCallDialogComponent, {
      width: '80%',
      height: '70%',
      data: element
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
    });
  }
  openEditAppointment(element:any) {
    console.log("Update user data----",element)
    const dialogRef = this.dialog.open(ApptDialogComponent, {
      width: '100%',
      height: '100%',
      data: element
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
    });
  }

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(data: any) {
    console.log("Service call data----", data)
    const dialogRef = this.dialog.open(
      EditServiceCallComponent,
      {
        height: '100%',
        width: '100%',
        disableClose: true,
        data: data
      }
    );
  }

}

