import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { UserApiServiceService } from '../../services/user-api.service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @ViewChild('proImageRef', { static: false }) proImageRef:
    | ElementRef
    | undefined;
  @ViewChild('coverImageRef', { static: false }) coverImageRef:
    | ElementRef
    | undefined;
  proImg: SafeUrl | undefined;
  coverImg: SafeUrl | undefined;
  coverImgFile: File | undefined;
  proImgFile: File | undefined;
  userData!: any;
  imgErr = '';
  success = false;
  noUpdates = false;

  constructor(
    private userApiServiceService: UserApiServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.userApiServiceService
      .getUser()
      .subscribe(
        ({ user }: { success: boolean; message: string; user: User }) => {
          this.userData = user;
        }
      );
  }

  

  coverImgChangeHandler(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files) {
      const fileType = files[0].type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        this.coverImg = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(files[0])
        );
        this.coverImgFile = files[0];
        this.imgErr = '';
      } else {
        this.imgErr =
          'cover image Invalid file type. Only jpeg, png, and gif images are allowed.';
      }
    }
  }

  proImgChangeHandler(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files) {
      const fileType = files[0].type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        this.proImg = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(files[0])
        );
        this.proImgFile = files[0];
        this.imgErr = '';
      } else {
        this.imgErr =
          'profile image Invalid file type. Only jpeg, png, and gif images are allowed.';
      }
    }
  }

  submitHandler() {
    if (this.userData.username.trim().length > 0) {
      if (this.userData.name.trim().length > 0) {
        if (this.coverImgFile || this.proImgFile) {
          const observables: any[] = [];

          if (this.coverImgFile) {
            observables.push(
              this.userApiServiceService.uploadImage(this.coverImgFile)
            );
          }

          if (this.proImgFile) {
            observables.push(
              this.userApiServiceService.uploadImage(this.proImgFile)
            );
          }

          if (observables.length > 0) {
            forkJoin(observables).subscribe((responses: any[]) => {
              if (this.coverImgFile) {
                this.userData.coverImg = responses[0].secure_url;
                this.coverImg = undefined;
                this.coverImgFile = undefined;
              }

              if (this.proImgFile) {
                this.userData.ProfileImg =
                  responses[this.coverImgFile ? 1 : 0].secure_url;
                this.proImg = undefined;
                this.proImgFile = undefined;
              }

              this.saveUserData();
            });
          } else {
            this.saveUserData();
          }
        } else {
          this.saveUserData();
        }
      } else {
        this.imgErr = 'please fill name';
      }
    } else {
      this.imgErr = 'please fill userName';
    }
  }

  private saveUserData() {
    console.log(this.userData.Address);
    
    this.userApiServiceService
      .saveUserData(this.userData)
      .subscribe((response: any) => {
        console.log(response);
        
        if (response?.success === true) {
          this.success = true;
        } else if (response?.message === 'noUpdates') {
          this.success = false;
          this.noUpdates = true;
        } else {
          this.imgErr = response.message;
        }
      });
  }
}
