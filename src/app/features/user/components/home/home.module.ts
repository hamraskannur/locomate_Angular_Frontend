// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { sharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,sharedModule,CoreModule, RouterModule.forChild(routes)]
})
export class HomeModule {}
