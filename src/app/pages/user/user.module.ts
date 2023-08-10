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
import { OnePostComponent } from './common/post/one-post.component';
import { CommentComponent } from './common/post/comment/comment.component';
import { EditPostComponent } from './common/post/edit-post/edit-post.component';
import { ReportPostComponent } from './common/post/report-post/report-post.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AccountComponent } from './common/account/account.component';
import { FriendAccountComponent } from './friend-account/friend-account.component';
import { AllPostComponent } from './common/account/all-post/all-post.component';
import { PrivatePageComponent } from './common/account/private-page/private-page.component';
import { ShowUserComponent } from './common/account/show-user/show-user.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TimeAgoPipe } from 'src/app/pipe/timePipe';
import { RequestsComponent } from './requests/requests.component';
import { CardComponent } from './requests/card/card.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
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
    ReportPostComponent,
    MyAccountComponent,
    AccountComponent,
    FriendAccountComponent,
    AllPostComponent,
    PrivatePageComponent,
    ShowUserComponent,
    SettingsComponent,
    SearchComponent,
    SearchBarComponent,
    SearchResultsComponent,
    EditProfileComponent,
    RequestsComponent,
    CardComponent
  ],
  imports: [UserRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
