import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { AddNewCustomerComponent } from '../add-new-customer/add-new-customer.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { ServiceCallDialogComponent } from '../service-call-dialog/service-call-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  data: any = {
    key: ['customer_name', 'customer_id', 'contact_name', 'mail_address', 'mobile_number', 'statement_name', 'short_name', 'name_soundex', 'shipping_method', 'tax_schedule'],
    name: ['Custoner Name', 'Customer Id', 'Contact Name', 'Mail Address', 'Mobile Number', 'Statement Name', 'Short Name', 'Name Soundex', 'Shipping Method', 'Taxchedule'],
    link: ['customer_name']
  };

  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;

  constructor(private dataService: DataService, public dialog: MatDialog ) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.dataService.getcustomerData({user_id:this.userId}).subscribe((data: any) => {
      console.log("Customer lists---------------",data)
      this.dataSource = new MatTableDataSource(data.result);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(data: any) {
    console.log("Customer data----", data)
    const dialogRef = this.dialog.open(
      EditCustomerComponent,
      {
        height: 'auto',
        width: '100%',
        disableClose: true,
        data: data
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
      dialogRef.close(); // Close the dialog box
    });
  }
  
    openAddCustomer(element:any) {
      console.log("Update user data----",element)
      const dialogRef = this.dialog.open(AddNewCustomerComponent, {
        width: '60%',
        height: '70%',
        data: element
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        /* do something with the result if needed */
      });
    }
 
  }
  
  
  
  

  









function openAddCustomer() {
  throw new Error('Function not implemented.');
}

