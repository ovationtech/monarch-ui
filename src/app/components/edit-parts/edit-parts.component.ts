import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPartsOrderDialogComponent } from '../edit-parts-order-dialog/edit-parts-order-dialog.component';

@Component({
  selector: 'app-edit-parts',
  templateUrl: './edit-parts.component.html',
  styleUrls: ['./edit-parts.component.scss']
})
export class EditPartsComponent {

  data: any = {
    key: ['id',  'call_number', 'appointment', 'order_number', 'ship_to', 'ship_city', 'ship_state', 'ship_country','order_status','delivered','order_closed','order_note'],
    name: ['ID',  ' Call Number ', 'Appointment', ' Order Number', ' SHIP TO ', ' SHIP CITY', 'SHIP STATE', ' SHIP COUNTRY',' ORDER STATUS',' DELIVERED','ORDER CLOSED','ORDER NOTE'],
    link:['id']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.dataService.getpartsorderdata({user_id:this.userId}).subscribe((data: any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'id', start: 'asc', disableClear: true });
      
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
    console.log("technician data----",data)
    const dialogRef = this.dialog.open(
      EditPartsOrderDialogComponent,
      {
        height: 'auto',
        width: '50%',
        disableClose: true,
        data: data
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
