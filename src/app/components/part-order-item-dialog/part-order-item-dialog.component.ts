
import { Component , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-part-order-item-dialog',
  templateUrl: './part-order-item-dialog.component.html',
  styleUrls: ['./part-order-item-dialog.component.scss']
})
export class PartOrderItemDialogComponent {

  user:any;
  userId: any;
  registerform!: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder, private userData: DataService) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.builder.group({
        id: this.builder.control(null),
        
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
        this.userData.editpartorderitem(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)
        });
  
  
      }
    }



}
