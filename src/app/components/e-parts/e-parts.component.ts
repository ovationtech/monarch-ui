import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-e-parts',
  templateUrl: './e-parts.component.html',
  styleUrls: ['./e-parts.component.scss']
})
export class EPartsComponent implements OnInit {
  data: any = {
    key: ['call_number', 'appointment_number', 'quantity','supplier', 'part_name', 'recover_part'],
    name: ['Call Number', 'Appointment Number', 'Quantity', 'Supplier','Part Name', 'Recover Part'],
    link: ['call_number']

    
  

  };
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;
  dataSource: any;
  servicePartsForm: any;
  showservicePartsForm: boolean = false; // set initial value to false
  
  constructor(private fb: FormBuilder, private dataService: DataService) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!);
    this.userId = userDetails?.user_id;
    this.dataService.getDataorderItem({user_id:this.userId}).subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      console.log("------------",data.key)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
 
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.servicePartsForm = this.fb.group({
      billTo: ['', Validators.required],
      customer_id: ['', Validators.required],
      created_by: ['', Validators.required],
      call_type: ['', Validators.required],
      dispatched: ['',],
      submitted_by: [''],
      overnight: [''],
      two_day: [''],
      three_day: ['', ],
      ground: [''],
      quantity: [''],
      part_number: [''],
      add_note: [''],
      supplier: [''],
      disposition: [''],
      recover_part: [''],
     
    });
  }

  openAddCustomer(){}

  toggleForm(element: {
     id: any; appointment_number:any; }){
    this.showservicePartsForm = !this.showservicePartsForm;
    console.log("-----show form ",element.appointment_number);
  }
}
