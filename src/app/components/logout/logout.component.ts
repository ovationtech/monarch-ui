import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private route: Router,private dataService:DataService) {}

  ngOnInit(): void { 
   sessionStorage.clear()
    this.route.navigate(['/login']);
  }

}
