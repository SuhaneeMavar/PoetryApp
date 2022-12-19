import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PoemComponent } from './pages/poems/poem/poem.component';
import { LoginComponent } from './pages/login/login.component';
import { CreatePoemComponent } from './pages/poems/create-poem/create-poem.component';
import { UpdatePoemComponent } from './pages/poems/update-poem/update-poem.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/core/page-not-found/page-not-found.component';
import { ErrorComponent } from './pages/core/error/error.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AuthDeactivateGuard } from './guards/auth-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent ,canActivate:[AuthDeactivateGuard]},
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent ,canActivate:[AuthDeactivateGuard]},
  { path: 'user/:id', component: ProfileComponent },
  { path: 'poems/post', component: CreatePoemComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'poems/edit/:id', component: UpdatePoemComponent, canActivate: [AuthGuard] },
  { path: 'poems/:id', component: PoemComponent, pathMatch: 'prefix' },
  { path: 'app', component: AppHomeComponent ,canActivate: [AuthGuard] },
  { path: 'read', component: AppHomeComponent ,canActivate:[AuthDeactivateGuard]},
  { path: 'login', component: LoginComponent ,canActivate:[AuthDeactivateGuard]},
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'error', component: ErrorComponent },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
