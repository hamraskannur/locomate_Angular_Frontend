import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { UserRoutingModule } from './user-routing.module';
// import { VerifyComponent } from './verify/verify.component';
// import { HomeComponent } from './home/home.component';

// import { FriendAccountComponent } from './friend-account/friend-account.component';
// import { SettingsComponent } from './settings/settings.component';
// import { SearchComponent } from './search/search.component';
// import { SearchBarComponent } from './search/search-bar/search-bar.component';
// import { SearchResultsComponent } from './search/search-results/search-results.component';
// import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { TimeAgoPipe } from 'src/app/shared/pipe/timePipe';
// import { RequestsComponent } from './requests/requests.component';
// import { CardComponent } from './requests/card/card.component';
// import { NotificationsComponent } from './notifications/notifications.component';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { NavBarComponent } from 'src/app/core/layout/nav-bar/nav-bar.component';
import { BottomBarComponent } from 'src/app/core/layout/bottom-bar/bottom-bar.component';
import { SuggestionComponent } from 'src/app/shared/components/user/suggestions/suggestion/suggestion.component';
import { AvatarComponent } from 'src/app/shared/components/user/avatar/avatar.component';
import { SuggestionsComponent } from 'src/app/shared/components/user/suggestions/suggestions.component';
import { OnePostComponent } from 'src/app/shared/components/user/post/one-post.component';
import { CommentComponent } from 'src/app/shared/components/user/post/comment/comment.component';
import { EditPostComponent } from 'src/app/shared/components/user/post/edit-post/edit-post.component';
import { ReportPostComponent } from 'src/app/shared/components/user/post/report-post/report-post.component';
import { ShowUserComponent } from 'src/app/shared/components/user/account/show-user/show-user.component';
import { PrivatePageComponent } from 'src/app/shared/components/user/account/private-page/private-page.component';
import { AllPostComponent } from 'src/app/shared/components/user/account/all-post/all-post.component';
import { AccountComponent } from 'src/app/shared/components/user/account/account.component';
import { TimeAgoPipe } from 'src/app/shared/pipe/timePipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FriendAccountComponent } from './components/friend-account/friend-account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/search/search.component';
import { SearchBarComponent } from './components/search/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { UserRoutingModule } from './user-routing.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CardComponent } from './components/requests/card/card.component';
import { RequestsComponent } from './components/requests/requests.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
// import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    HomeComponent,
    SuggestionComponent,
    AvatarComponent,
    SuggestionsComponent,
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
    CardComponent,
    NotificationsComponent,
    LayoutComponent,
    NavBarComponent,
    BottomBarComponent,
  ],
  imports: [UserRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
