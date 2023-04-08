import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCallDialogComponent } from '../service-call-dialog/service-call-dialog.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {
  data: any = {
    key: ['username', 'email', 'user_group', 'city', 'state'],
    name: ['username', 'Email', 'User Group', 'City', 'State'],
    link: ['username']
  };

  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog) {

    this.userService.getUsers1()?.subscribe((data: any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let x of this.data?.key)
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

  openAddUserDialog(element:any) {
    console.log("Update user data----",element)
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '700px',
      height: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
    });
  }

  openDialog(data: any) {
    console.log("Service call data----", data)
    const dialogRef = this.dialog.open(
      ServiceCallDialogComponent,
      {
        height: 'auto',
        width: '100%',
        disableClose: true,
        data: data
      }
    );
  }

}
