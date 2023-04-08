import { Component, Inject , ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent {



  user:any;
  userId: any;
  registerform!: FormGroup;
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder, private userData: DataService) {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.builder.group({
        id: this.builder.control(null),
        customer_id: this.builder.control(''),
        location_id: this.builder.control('',Validators.required),
        name: this.builder.control('',Validators.required),
        document_id: this.builder.control('',Validators.required),
    
        document_type: this.builder.control(''),
        document_description: this.builder.control(''),
        document_date: this.builder.control(''),
        
        user_id:[this.userId]
    
      });
      console.log("Data-----",data)
      this.registerform?.patchValue(data)

    }

 
    
        


    
    
  
    proceedregister() {
  
      if (this.registerform.valid) {
        this.userData.getdocument(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)
        });
  
  
      }
    }

}
