import { Component , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceCallDialogComponent } from '../service-call-dialog/service-call-dialog.component';
import { EquipmentEditComponent } from '../equipment-edit/equipment-edit.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss']
})
export class EquipmentItemComponent {

  data: any = {
    key: ['id', 'equipment_id', 'config_id', 'serial_number', 'manufacturer', 'equip_type_id', 'customer_id', 'location_id', 'model', 'sku_number', 'start_date', 'stop_date', 'oem','marker'],
    name: ['Serial. No.', 'Equipment ID', 'Config ID', 'Serial Number', 'Manufacturer', 'Equip Type', 'Customer ID','Location ID', 'Model', 'SKU Number', 'Start Date', 'Stop Date', 'OEM','Marker'],
    link:['id']

  }
  dataSource!: MatTableDataSource<any>;
  isProgress: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userId: any;
  newCallFlag: Boolean = true;
  newCallData: any;
  formControl: any;


  constructor(private dataService: DataService, public dialog: MatDialog, private formBuilder:FormBuilder) {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id

    this.dataService.getequipmentData({user_id:this.userId}).subscribe((data: any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.isProgress = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'id', start: 'asc', disableClear: true });

      // this.dataSource.filterPredicate = (data: any, filter: string) => {
      //   const dataStr = data.equip_type_id.toLowerCase() + data.manufacturer.toLowerCase() + 
      //   data.model.toLowerCase() + String(data.sku_number).toLowerCase() + data.equipment_id.toLowerCase() + 
      //   data.serial_number.toLowerCase() + String(data.customer_id).toLowerCase() + String(data.location_id).toLowerCase();
      //   return dataStr.includes(filter.trim().toLowerCase());
      // };

      this.dataSource.filterPredicate = ((data, filter) => {
        const equip_type_id = !filter.equip_type_id || String(data.equip_type_id).toLowerCase().includes(filter.equip_type_id);
        const manufacturer = !filter.manufacturer || String(data.manufacturer).toLowerCase().includes(filter.manufacturer);
        const model = !filter.model || String(data.model).toLowerCase().includes(filter.model);
        const sku_number = !filter.sku_number || String(data.sku_number).toLowerCase().includes(filter.sku_number);
        const equipment_id = !filter.equipment_id || String(data.equipment_id).toLowerCase().includes(filter.equipment_id);
        const serial_number = !filter.serial_number || String(data.serial_number).toLowerCase().includes(filter.serial_number);
        const customer_id = !filter.customer_id || String(data.customer_id).toLowerCase().includes(filter.customer_id);
        const location_id = !filter.location_id || String(data.location_id).toLowerCase().includes(filter.location_id);
        return equip_type_id && manufacturer && model && sku_number && equipment_id && serial_number && customer_id && location_id;
      }) as (data:any, string:any) => boolean;

    })

    this.formControl = formBuilder.group({
      manufacturer: '',
      equip_type_id: '',
      model: '',
      sku_number: '',
      equipment_id: '',
      serial_number: '',
      customer_id: '',
      location_id: '',
    })
    this.formControl.valueChanges.subscribe((value:any) => {
      const filter = {...value, manufacturer: value.manufacturer.trim().toLowerCase()} as string;
      this.dataSource.filter = filter;
    });


  }
  

  applyFilter(event: Event, column: any) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = String(data[column]).toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(ev: any, data:any){
    if (ev.target.className !== "badge"){
      
      // console.log("Events----",ev.target.parentNode.parentNode)
      console.log("Data----",data)
      this.newCallFlag = false;
      this.newCallData = data
    }
    else{
      this.newCallFlag = true;
    }
  }


  openDialogNewCall() {
    console.log("technician data----",this.newCallData)
    const dialogRef = this.dialog.open(
      ServiceCallDialogComponent,
      {
        width: '80%',
        height: 'auto',
        disableClose: true,
        data: this.newCallData
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialog(data:any) {
    console.log("technician data----",data)
    const dialogRef = this.dialog.open(
      EquipmentEditComponent,
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
