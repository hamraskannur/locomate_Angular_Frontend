import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ToastrServiceService } from 'src/app/features/user/services/toastr.service';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { addPostSuccess } from 'src/app/stores/user/user.actions';

@Component({
  selector: 'app-upload-shorts',
  templateUrl: './upload-shorts.component.html',
  styleUrls: ['./upload-shorts.component.css']
})
export class UploadShortsComponent {

  @Output() addshorts: EventEmitter<boolean> = new EventEmitter<boolean>();

  file: File | null = null;
  message=""
  loading=false
  description=""
  constructor(
    private sanitizer: DomSanitizer,
    private UserApiServiceService: UserApiServiceService,
    private toastrServiceService:ToastrServiceService,
    private store: Store<{ user: UserState }>,

  ) {}

  setShortsModal(value: boolean){
    this.addshorts.emit(value);
  }

  safeImageUrl(file: Blob): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  removeFile(){
    this.file = null;
  }

  handleFile(event: Event){
    this.message = '';
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files;
    if(file){
      const fileType = file[0]['type'];
      const validVideoTypes = [
        'video/mp4',
        'video/avi',
        'video/mkv',
        'video/mov'
      ];
      
      if (validVideoTypes.includes(fileType)) {
        this.file = file[0];
      } else {
        this.message = 'Only video files are accepted.';
      }
    }
  }


  submitHandler(){
   
    if (this.file) {
      if (this.description.trim().length != 0) {

      this.loading = true
      this.UserApiServiceService.uploadvideo(this.file).subscribe(({secure_url}:{ secure_url: string })=>{
        console.log(secure_url,"this is a video");
        const object = {
          imageLinks: secure_url,
          description: this.description,
        };
        this.UserApiServiceService.uploadVideoDms(object).subscribe(({status}:{status:boolean})=>{
            if(status){
              this.loading = false;
              this.addshorts.emit(false);
              this.store.dispatch(addPostSuccess());
              this.message = '';
              this.description = '';
              this.file =null
              this.toastrServiceService.showSuccess("successfully uploaded post")
            }
        })
      })
    }else{
      this.message="add your description"
    }
    }else{
      this.message="select your video file"
    }

  }
}
