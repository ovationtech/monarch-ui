import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { TechnicianDialogComponent } from '../technician-dialog/technician-dialog.component';


@Component({
  selector: 'app-technician-item',
  templateUrl: './technician-item.component.html',
  styleUrls: ['./technician-item.component.scss']
})
export class TechnicianItemComponent {
  data: any = {
    key: ['id',  'tech_vendor_id', 'tech_team', 'tech_long_name', 'tech_dba_name', 'tech_prim_skill', 'tech_type', 'tech_city','tech_state','tech_zip','tech_country','tech_phone_1'],
    name: ['ID',  ' Vendor ', 'Team', ' Name', ' DBA ', ' Skill', 'Type', ' City',' State',' Zip','Country','Contact'],
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

    this.dataService.getalltechnicianData({user_id:this.userId}).subscribe((data: any) => {
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
      TechnicianDialogComponent,
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
