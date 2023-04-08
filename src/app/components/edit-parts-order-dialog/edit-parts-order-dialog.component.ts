import { Component , Inject, OnInit, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-parts-order-dialog',
  templateUrl: './edit-parts-order-dialog.component.html',
  styleUrls: ['./edit-parts-order-dialog.component.scss']
})
export class EditPartsOrderDialogComponent implements OnInit {

  user:any;
  userId: any;
  registerform!: FormGroup;
  @Input() SSSSdata:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder, private userData: DataService) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.builder.group({
        id: this.builder.control(null),
        call_number: this.builder.control(''),
        appointment: this.builder.control('',Validators.required),
        order_number: this.builder.control('',Validators.required),
        order_is_ready: this.builder.control('',Validators.required),
        ready_set_by: this.builder.control(''),
        ready_set_time: this.builder.control(''),
        ship_to: this.builder.control(''),
        ship_to_name: this.builder.control(''),
        ship_address_1: this.builder.control(''),
        ship_address_2: this.builder.control(''),
        ship_city: this.builder.control(''),
        ship_state: this.builder.control(''),
        ship_zip: this.builder.control(''),
        ship_country: this.builder.control(''),
        ship_attn: this.builder.control(''),
        ship_method: this.builder.control(''),
        ship_priority: this.builder.control(''),
        picker_notes: this.builder.control(''),
        order_status: this.builder.control(''),
        submitted_by: this.builder.control(''),
        submitted_time: this.builder.control(''),
        last_status_set_by: this.builder.control(''),
        last_status_time: this.builder.control(''),
        return_tracking_number: this.builder.control(''),
        quote_needed: this.builder.control(''),
        quote_needed_by: this.builder.control(''),
        quote_needed_time : this.builder.control(''),
        quote_is_ready: this.builder.control(''),
        quote_by: this.builder.control(''),
        quote_time: this.builder.control(''),
        shipping_is_ready: this.builder.control(''),
        shipping_set_by : this.builder.control(''),
        shipping_time: this.builder.control(''),
        shipping_quote_1: this.builder.control(''),
        shipping_quote_2: this.builder.control(''),
        shipping_quote_3 : this.builder.control(''),
        shipping_quote_4: this.builder.control(''),
        shipping_quote_5 : this.builder.control(''),
        in_process : this.builder.control(''),
        in_process_by: this.builder.control(''),
        in_process_time: this.builder.control(''),
        order_complete : this.builder.control(''),
        order_complete_by: this.builder.control(''),
        order_complete_time: this.builder.control(''),
        delivered : this.builder.control(''),
        delivered_by : this.builder.control(''),
        delivered_time: this.builder.control(''),
        usage_complete: this.builder.control(''),
        usage_complete_by: this.builder.control(''),
        usage_complete_time: this.builder.control(''),
        recovery_complete: this.builder.control(''),
        recovery_complete_by: this.builder.control(''),
        recovery_complete_time: this.builder.control(''),
        order_closed : this.builder.control(''),
        order_closed_by: this.builder.control(''),
        order_closed_time: this.builder.control(''),
        order_note: this.builder.control(''),
        added_by: this.builder.control(null),
        added_on: this.builder.control(null),
        modified_by: this.builder.control(null),
        modified_on: this.builder.control(null),
        isactive: this.builder.control(true),
        user_id:[this.userId]
    
      });
      console.log("Data-----",data)
      this.registerform?.patchValue(data)

      this.registerform?.patchValue(this.SSSSdata)
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
    if(this.SSSSdata)
      this.registerform?.patchValue(this.SSSSdata)
  }


    
  
    proceedregister() {
  
      if (this.registerform.valid) {
        this.userData.editpartorderdata(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)
        });
  
  
      }
    }


}
