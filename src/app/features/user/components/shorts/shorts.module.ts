// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { sharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ShortsComponent } from './shorts.component';


const routes: Routes = [
  { path: '', component: ShortsComponent}
];

@NgModule({
  declarations: [ShortsComponent],
  imports: [CommonModule,sharedModule,CoreModule, RouterModule.forChild(routes)]
})
export class ShortsModule {}
