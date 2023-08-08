import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { BottomBarComponent } from './layout/bottom-bar/bottom-bar.component';
import { SuggestionComponent } from './common/suggestions/suggestion/suggestion.component';
import { AvatarComponent } from './common/avatar/avatar.component';
import { SuggestionsComponent } from './common/suggestions/suggestions.component';
import { PostComponent } from './home/post/post.component';
import { OnePostComponent } from './common/post/one-post/one-post.component';
import { CommentComponent } from './common/post/comment/comment.component';
import { EditPostComponent } from './common/post/edit-post/edit-post.component';
import { ReportPostComponent } from './common/post/report-post/report-post.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    HomeComponent,
    LayoutComponent,
    NavBarComponent,
    BottomBarComponent,
    SuggestionComponent,
    AvatarComponent,
    SuggestionsComponent,
    PostComponent,
    OnePostComponent,
    CommentComponent,
    EditPostComponent,
    ReportPostComponent
  ],
  imports: [UserRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
