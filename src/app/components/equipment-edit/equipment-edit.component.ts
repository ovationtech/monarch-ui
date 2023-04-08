import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent {

  user: any;
  registerform!: FormGroup;
  userId: any;
  


  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EquipmentEditComponent>, private userData:DataService , private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.formBuilder.group({

        id:[],
      record_number:[null, Validators.required],
      equipment_id: ['', Validators.required],
      sku_number:[null],
      manufacturer: [''],
      equip_type_id:[''],
      model: [''],
      oem: [''],
      serial_number: ['', Validators.required],
      customer_id: [null, Validators.required],
      location_id: [null, Validators.required],
      physical_location: [''],
      page_count: [''],
      contract_number: ['', Validators.required],
      start_date: [''],
      stop_date: [''],
      amount: [''],
      cn_note: [''],
      equip_note: [''],


      config_id: [null],
      no_serial_number:[null],
      temporary_serial: [null],
      amount_frequency: [null],
      user_define_2a: [null],
      user_define_3a: [null],
      modifdt: [null],
      modified_time: [null],
      mdfusrid: [null],
      page_count_required:[null],
      xml_history: [null],
      cust_data_1: [null],
      cust_data_2: [null],
      cust_data_3: [null],
      cust_data_4: [null],
      cust_data_5: [null],
      v2_customer_id: [null],
      v2_start_date: [null],
      v2_stop_date: [null],
      v2_monthly_amount: [null],
      v2_import_model:[null],
      v2_cn_note: [null],
      v2_contract_number: [null],
      v2_config_id: [null],
      v2_invalid_config: [null],
      v2_no_config_id: [null],
      v2_prohibit_calls: [null],
      modeloemconfirm: [null],
      modeloemconfirmby: [null],
      modeloemconfirmdate: [null],

      aux_string4000_1: [null],
      previous_config_id: [null],
      aux_string_1: [null],
      aux_string_2: [null],
      aux_string_3: [null],
      aux_string_4: [null],
      aux_string_5: [null],
      aux_string_6: [null],
      aux_string_7: [null],
      marker: [null],
      added_by: [null],
      added_on: [null],
      modified_by: [null],
      modified_on: [null],
      isactive: [null],

      city: [null],
      state: [null],
      user_id:[this.userId]

      })
      this.registerform?.patchValue(data)

    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    proceedregister() {

      if (this.registerform.valid) {
        this.userData.editequipment(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)

          alert('succesfully');
        });
  
  
      }

    }

    
    }
    