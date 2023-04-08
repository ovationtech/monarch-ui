import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { EquipPartsOrderDialogComponent } from '../equip-parts-order-dialog/equip-parts-order-dialog.component';

@Component({
  selector: 'app-equip-parts-order',
  templateUrl: './equip-parts-order.component.html',
  styleUrls: ['./equip-parts-order.component.scss']
})
export class EquipPartsOrderComponent {


  
  data: any = {
    key: ['config_id', 'equipment_id', 'serial_number', 'page_count_required', 'model', 'manufacturer', 'part_number','part_name','part_note'],
    name: [ ' Config ID ', 'Equipment ID', ' Serial Number', ' Page Count Required ', ' Model', 'Manufacturer', ' Part Number',' Part Name',' Part Note'],
    link:['config_id']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.dataService.getequippartsorder({user_id:this.userId}).subscribe((data: any) => {
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
      EquipPartsOrderDialogComponent,
      {
        height: 'auto',
        width: '60%',
        disableClose: true,
        data: data
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
