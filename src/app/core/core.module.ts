import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { BottomBarComponent } from './components/layout/bottom-bar/bottom-bar.component';
import { RouterModule } from '@angular/router';
import { sharedModule } from '../shared/shared.module';
import { UploadPhotoComponent } from './components/layout/upload-photo/upload-photo.component';
import { UploadShortsComponent } from './components/layout/upload-shorts/upload-shorts.component';
import { AdminLayoutComponent } from './components/admin/admin-layout.component';
import { AdminBottomBarComponent } from './components/admin/admin-bottom-bar/admin-bottom-bar.component';
import { AdminNavBarComponent } from './components/admin/admin-nav-bar/admin-nav-bar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavBarComponent,
    BottomBarComponent,
    UploadPhotoComponent,
    UploadShortsComponent,
    AdminLayoutComponent,
    AdminBottomBarComponent,
    AdminNavBarComponent,
],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    sharedModule
  ],
  exports: [LayoutComponent,AdminLayoutComponent],

})
export class CoreModule { }
