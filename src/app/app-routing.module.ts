import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFeedComponent } from './pages/user/user-feed/user-feed.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { UserTrendsComponent } from './pages/user/user-trends/user-trends.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component:UserFeedComponent,
    canActivate:[AuthGuard]
  },
  {path:'user-login', component:UserLoginComponent},
  {path:'user-trends', component:UserTrendsComponent},
  {path:'user-profile', component:UserProfileComponent},
  {path:'user-settings', component:UserSettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
