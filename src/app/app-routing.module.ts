import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFeedComponent } from './pages/user/user-feed/user-feed.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { DetailsPostComponent } from './pages/user/details-post/details-post.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserChatComponent } from './pages/user/user-chat/user-chat.component';
import { UserProfileCaresComponent } from './pages/user/user-profile-cares/user-profile-cares.component';
import { UserCommentComponent } from './pages/user/user-comment/user-comment.component';
import { AdminReportsComponent } from './pages/admin/admin-reports/admin-reports.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminPostsComponent } from './pages/admin/admin-posts/admin-posts.component';
import { AdminRequestsComponent } from './pages/admin/admin-requests/admin-requests.component';
import { RoleGuard } from './services/role.guard';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';

const routes: Routes = [
  //USER
  { path: '', component: UserFeedComponent, canActivate: [AuthGuard] },
  { path: 'user-login', component: UserLoginComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile-cares',
    component: UserProfileCaresComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-chat', component: UserChatComponent, canActivate: [AuthGuard],
 },
  {
    path: 'details-post/:id',
    component: DetailsPostComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'user-comment',
    component: UserCommentComponent,
    canActivate: [AuthGuard],

  },

  //ADMIN
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data:{
      roles:['admin']
    }
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data:{
      roles:['admin']
    }
  },
  {
    path: 'admin-posts',
    component: AdminPostsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data:{
      roles:['admin']
    }
  },
  {
    path: 'admin-reports',
    component: AdminReportsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data:{
      roles:['admin']
    }
  },
  {
    path: 'admin-requests',
    component: AdminRequestsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data:{
      roles:['admin']
    }
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data:{
      roles:['admin']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
