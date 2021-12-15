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

const routes: Routes = [
  { path: '', component: UserFeedComponent, canActivate: [AuthGuard] },
  {path:'user-login', component:UserLoginComponent},
  {path:'user-profile', component:UserProfileComponent, canActivate:[AuthGuard]},
  { path:'user-profile-cares', component:UserProfileCaresComponent, canActivate:[AuthGuard] },
  { path:'user-chat', component:UserChatComponent, canActivate:[AuthGuard] },
  {path:'details-post/:id', component:DetailsPostComponent, canActivate:[AuthGuard]},
  { path:'admin-login', component:AdminLoginComponent },
  { path:'admin-dashboard', component:AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
