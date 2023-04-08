import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import { AddUserComponent } from '../../add-user/add-user.component';
import { UserListComponent } from '../../user-list/user-list.component';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userName!: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // check if the user is logged in
    if (!this.authService.isLoggedIn()) {
      // navigate to login page if not logged in
      this.router.navigate(['/login']);
    } else {
      let user = JSON.parse(sessionStorage.getItem('user')!);
      this.userName = user?.first_name + ' ' + user?.last_name;
      console.log(user, "user data");
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    window.location.reload();
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '700px',
      height:'400px',
      data: { /* any data you want to pass to the dialog */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
    });
  }
  openUserListDialog() {
    const dialogRef = this.dialog.open(UserListComponent, {
      width: '700px',
      height:'400px',
      data: { /* any data you want to pass to the dialog */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* do something with the result if needed */
    });
  }
}
