import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCallDialogComponent } from '../service-call-dialog/service-call-dialog.component';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent {
  data: any = {
    key: ['id', 'first_name', 'last_name', 'customer_id', 'service_description', 'call_owner', 'contact_name', 'contact_phone', 'contact_email'],
    name: ['Service Call ID', 'First Name', 'Last Name', 'Customer Id', 'Service Description', 'Call Owner', 'Contact Name', 'Contact Phone', 'Contact Email'],
    link:['id']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService, public dialog: MatDialog) {

    this.dataService.getData().subscribe((data: any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data.result);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let x of this.data.key)
        console.log("Datas list-----", x.key)
      console.log("Datas list-----", this.data.key[0].name)

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
    console.log("Service call data----",data)
    const dialogRef = this.dialog.open(
      ServiceCallDialogComponent,
      {
        height: 'auto',
        width: '100%',
        disableClose: true,
        data: data
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
