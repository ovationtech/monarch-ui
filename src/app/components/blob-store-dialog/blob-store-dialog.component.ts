import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-blob-store-dialog',
  templateUrl: './blob-store-dialog.component.html',
  styleUrls: ['./blob-store-dialog.component.scss']
})
export class BlobStoreDialogComponent {

  user: any;
  registerform!: FormGroup;
  userId: any;
  
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<BlobStoreDialogComponent>, private userData:DataService , private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any)

    {
      const userDetails = JSON.parse(sessionStorage.getItem('user')!)
      this.userId = userDetails?.user_id
      this.registerform = this.formBuilder.group({

        id:[],
        blob_name: ['', Validators.required],
        blob_value: ['', Validators.required],
        
        added_by: [this.userId],
        added_on: [null],
        modified_by: [this.userId],
        modified_on: [null],
        isactive: [true],

        
        user_id:[this.userId]

      })
      this.registerform?.patchValue(data)

    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    proceedregister() {

      if (this.registerform.valid) {
        this.userData.upsert_blobstore(this.registerform.value).subscribe((result: any) => {
          this.user = result
          console.warn(result)

        });
  
  
      }

    }

}
