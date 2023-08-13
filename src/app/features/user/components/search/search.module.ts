import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { CoreModule } from 'src/app/core/core.module';
import { sharedModule } from 'src/app/shared/shared.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';



const route:Routes =[
    {path:'',component:SearchComponent},
]
@NgModule({
  declarations: [SearchComponent,SearchResultsComponent,SearchBarComponent],
  imports: [FormsModule,CommonModule,CoreModule,sharedModule,RouterModule.forChild(route)],
})
export class SearchModule { }
