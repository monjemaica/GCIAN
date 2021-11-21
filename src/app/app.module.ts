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
import { UserFeedComponent } from './pages/user/user-feed/user-feed.component';
import { UserTrendsComponent } from './pages/user/user-trends/user-trends.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './modal/change-password/change-password.component';
import { CreatePostComponent } from './modal/posts/create-post/create-post.component';
import { EditPostComponent } from './modal/posts/edit-post/edit-post.component';
import { DeletePostComponent } from './modal/posts/delete-post/delete-post.component';
import { CreateCommentComponent } from './modal/comments/create-comment/create-comment.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './helpers/auth.interceptor';
import { DetailsPostComponent } from './pages/user/details-post/details-post.component';
import { EditCommentComponent } from './modal/comments/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './modal/comments/delete-comment/delete-comment.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './modal/admin-profile/admin-profile.component'

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserFeedComponent,
    UserTrendsComponent,
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
  ],
  imports: [
    BrowserModule,
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
    HttpClientModule
  ],
  providers: [
    AuthInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
