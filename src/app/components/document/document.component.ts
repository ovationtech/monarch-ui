import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {


  data: any = {
    key: ['customer_id',  'location_id','id', 'name','document_id', 'document_type', 'document_description', 'document_date'],
    name: ['Customer ID',  ' Location Id ','Call Number', 'Name','Document ID', ' Document Type', ' Document Description ', ' Document Date'],
    link:['customer_id']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.dataService.getdocument({user_id:this.userId}).subscribe((data: any) => {
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
      DocumentDialogComponent,
      {
        height: 'auto',
        width: '70%',
        disableClose: true,
        data: data
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
