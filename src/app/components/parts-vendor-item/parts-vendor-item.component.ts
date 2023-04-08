
import { Component , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';

import { EquipmentEditComponent } from '../equipment-edit/equipment-edit.component';
import { PartOrderItemDialogComponent } from '../part-order-item-dialog/part-order-item-dialog.component';
import { PartsVendorDialogComponent } from '../parts-vendor-dialog/parts-vendor-dialog.component';


@Component({
  selector: 'app-parts-vendor-item',
  templateUrl: './parts-vendor-item.component.html',
  styleUrls: ['./parts-vendor-item.component.scss']
})
export class PartsVendorItemComponent {

  data: any = {
    key: [ 'system_id', 'vendor_id', 'vendor_long_name', 'vendor_address_1', 'vendor_address_2', 'vendor_city', 'vendor_state','vendor_zip','vendor_phone_1'],
    name: [ 'System Id', 'Vendor Id', 'Vendor Name', 'Address 1', 'Address 2', 'City', 'State','Zip','Phone ' ],
    link:['system_id']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id

    this.dataService.getpartsvendor({user_id:this.userId}).subscribe((data: any) => {
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
      PartsVendorDialogComponent,
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
