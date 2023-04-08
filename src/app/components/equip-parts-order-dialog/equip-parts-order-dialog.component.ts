import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { PartsComponent } from '../parts/parts.component';

@Component({
  selector: 'app-equip-parts-order-dialog',
  templateUrl: './equip-parts-order-dialog.component.html',
  styleUrls: ['./equip-parts-order-dialog.component.scss']
})
export class EquipPartsOrderDialogComponent {


  user:any;
  userId: any;
  registerform!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder, private userData: DataService) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.builder.group({
        // id: this.builder.control(null,Validators.required),
        config_id: this.builder.control('',Validators.required),
        equipment_id: this.builder.control('',Validators.required),
        serial_number: this.builder.control('',Validators.required),
    
        page_count_required: this.builder.control(''),
        model: this.builder.control(''),
        manufacturer: this.builder.control('',Validators.required),
        part_number: this.builder.control(''),
        part_name: this.builder.control(''),
        part_note: this.builder.control(''),
        part_temp_flag: this.builder.control(''),
        part_name_changed_flag: this.builder.control(''),
        prev_part_name: this.builder.control(''),
        added_by: this.builder.control(null),
        added_on: this.builder.control(null),
        modified_by: this.builder.control(null),
        modified_on: this.builder.control(null),
        isactive: this.builder.control(true),
        user_id:[this.userId]
    
      });
      console.log("Data-----",data)
      this.registerform?.patchValue(data)

    }


    
        


    
    
  
    proceedregister() {
  
      if (this.registerform.valid) {
        this.userData.editpartsname(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)
        });
  
  
      }
    }

}
