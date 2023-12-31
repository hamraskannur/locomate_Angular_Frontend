import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/user/avatar/avatar.component';
import { SuggestionsComponent } from './components/user/suggestions/suggestions.component';
import { SuggestionComponent } from './components/user/suggestions/suggestion/suggestion.component';
import { AccountComponent } from './components/user/account/account.component';
import { ShowUserComponent } from './components/user/account/show-user/show-user.component';
import { PrivatePageComponent } from './components/user/account/private-page/private-page.component';
import { AllPostComponent } from './components/user/account/all-post/all-post.component';
import { OnePostComponent } from './components/user/post/one-post.component';
import { EditPostComponent } from './components/user/post/edit-post/edit-post.component';
import { CommentsComponent } from './components/user/post/comments/comments.component';
import { TimeAgoPipe } from './pipe/timePipe';
import { CommentComponent } from './components/user/post/comments/comment/comment.component';
import { ReplayCommentComponent } from './components/user/post/comments/comment/replay-comment/replay-comment.component';
import { AlertComponent } from './components/user/alert/alert.component';
import { LoadingComponent } from './components/user/loding/loading.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    AvatarComponent,
    SuggestionsComponent,
    SuggestionComponent,
    AccountComponent,
    ShowUserComponent,
    PrivatePageComponent,
    AllPostComponent,
    OnePostComponent,
    EditPostComponent,
    CommentsComponent,
    CommentComponent,
    ReplayCommentComponent,
    AlertComponent
  ],
  imports: [CommonModule,FormsModule,RouterModule],
  exports: [
    AvatarComponent,
    SuggestionsComponent,
    SuggestionComponent,
    AccountComponent,
    ShowUserComponent,
    PrivatePageComponent,
    AllPostComponent,
    OnePostComponent,
    EditPostComponent,
    CommentsComponent,
    TimeAgoPipe,
  ],
})
export class sharedModule {}
