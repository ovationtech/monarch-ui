
import { Component , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PartsVendorDialogComponent } from '../parts-vendor-dialog/parts-vendor-dialog.component';
import { PartOrderItemDialogComponent } from '../part-order-item-dialog/part-order-item-dialog.component';
import { BlobStoreDialogComponent } from '../blob-store-dialog/blob-store-dialog.component';

@Component({
  selector: 'app-blob-store-list',
  templateUrl: './blob-store-list.component.html',
  styleUrls: ['./blob-store-list.component.scss']
})
export class BlobStoreListComponent {

  data: any = {
    key: [ 'blob_name', 'blob_value', ],
    name: [  'blob name', 'blob value',],
    link:['blob_name']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;



  constructor(private dataService: DataService, public dialog: MatDialog) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id

    this.dataService.getallblobstore({user_id:this.userId}).subscribe((data: any) => {
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
      BlobStoreDialogComponent,
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
