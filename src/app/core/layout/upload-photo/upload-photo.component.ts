import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { UserState } from 'src/app/stores/user/user.reducer';
import { addPostSuccess } from 'src/app/stores/user/user.actions';
import { ToastrServiceService } from 'src/app/features/user/services/toastr.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css'],
})
export class UploadPhotoComponent {
  @Output() addPost: EventEmitter<boolean> = new EventEmitter<boolean>();
  message = '';
  description = '';
  files: File[] = [];
  loading = false;
  ImageLinks: string[] = [];
  constructor(
    private sanitizer: DomSanitizer,
    private UserApiServiceService: UserApiServiceService,
    private store: Store<{ user: UserState }>,
    private toastrServiceService:ToastrServiceService
  ) {}

  setAddPost(value: boolean) {
    this.addPost.emit(value);
  }

  handleFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files;
    if (file) {
      const fileType = file[0]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        this.files.push(file[0]);
      } else {
        this.message = 'only images accepted';
      }
    }
  }

  removeImage(name: string) {
    this.files = this.files.filter((x) => x.name !== name);
  }

  safeImageUrl(file: Blob): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  submitHandler() {
    if (this.files.length > 0) {
      if (this.description.trim().length != 0) {
        this.loading = true;
        const uploadObservables = this.files.map((file) => {
          return this.UserApiServiceService.uploadImage(file);
        });

        forkJoin(uploadObservables).subscribe((uploadResponses) => {
          const secureUrls = uploadResponses.map(
            (response) => response.secure_url
          );

          let object = {
            imageLinks: secureUrls,
            description: this.description,
          };

          if (object.imageLinks.length > 0) {
            const data = this.UserApiServiceService.addPost(object);
            data.subscribe(({ status }: { status: boolean }) => {
              if (status) {
                this.loading = false;
                this.addPost.emit(false);
                this.store.dispatch(addPostSuccess());
                this.message = '';
                this.description = '';
                this.files = [];
                this.ImageLinks = [];
                this.toastrServiceService.showSuccess("successfully uploaded post")
              }
            });
          }
        });
      } else {
        this.message = 'add your description';
      }
    } else {
      this.message = 'select your images';
    }
  }
}
