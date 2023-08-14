import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { BottomBarComponent } from './layout/bottom-bar/bottom-bar.component';
import { RouterModule } from '@angular/router';
import { sharedModule } from '../shared/shared.module';
import { UploadPhotoComponent } from './layout/upload-photo/upload-photo.component';
import { UploadShortsComponent } from './layout/upload-shorts/upload-shorts.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavBarComponent,
    BottomBarComponent,
    UploadPhotoComponent,
    UploadShortsComponent,
],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    sharedModule
  ],
  exports: [LayoutComponent],

})
export class CoreModule { }
