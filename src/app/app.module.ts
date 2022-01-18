import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserFeedComponent } from './pages/user/user-feed/user-feed.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './modal/change-password/change-password.component';
import { CreatePostComponent } from './modal/posts/create-post/create-post.component';
import { EditPostComponent } from './modal/posts/edit-post/edit-post.component';
import { DeletePostComponent } from './modal/posts/delete-post/delete-post.component';
import { CreateCommentComponent } from './modal/comments/create-comment/create-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './helpers/auth.interceptor';
import { DetailsPostComponent } from './pages/user/details-post/details-post.component';
import { EditCommentComponent } from './modal/comments/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './modal/comments/delete-comment/delete-comment.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AppInfoComponent } from './modal/app-info/app-info.component';
import { ReportPostComponent } from './modal/posts/report-post/report-post.component';
import { UserChatComponent } from './pages/user/user-chat/user-chat.component';
import { UserProfileCaresComponent } from './pages/user/user-profile-cares/user-profile-cares.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminPostsComponent } from './pages/admin/admin-posts/admin-posts.component';
import { AdminReportsComponent } from './pages/admin/admin-reports/admin-reports.component';
import { AdminRequestsComponent } from './pages/admin/admin-requests/admin-requests.component';
import { AlertComponent } from './components/alert/alert.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamImageComponent } from './modal/webcam-image/webcam-image.component';
import { AdminViewPostsComponent } from './modal/admin-view-posts/admin-view-posts.component';
import { AdminEditFieldsComponent } from './modal/admin-edit-fields/admin-edit-fields.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminViewReportsComponent } from './modal/admin-view-reports/admin-view-reports.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { UserChatroomComponent } from './pages/user/user-chatroom/user-chatroom.component';
import { UserCreateRoomComponent } from './modal/user-create-room/user-create-room/user-create-room.component';
import { UserChatroomLeaveComponent } from './modal/chat/user-chatroom-leave/user-chatroom-leave.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserFeedComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent,
    CreateCommentComponent,
    DetailsPostComponent,
    EditCommentComponent,
    DeleteCommentComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminProfileComponent,
    AppInfoComponent,
    ReportPostComponent,
    UserChatComponent,
    UserProfileCaresComponent,
    AdminUsersComponent,
    AdminPostsComponent,
    AdminReportsComponent,
    AdminRequestsComponent,
    AlertComponent,
    WebcamImageComponent,
    AdminViewPostsComponent,
    AdminEditFieldsComponent,
    AdminViewReportsComponent,
    NotifierComponent,
    UserChatroomComponent,
    UserCreateRoomComponent,
    UserChatroomLeaveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    NgbModule,
    LayoutModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    WebcamModule,
    Ng2SearchPipeModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    AuthInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
