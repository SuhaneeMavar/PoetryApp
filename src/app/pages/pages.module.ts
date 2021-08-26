import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { PoemComponent } from './poems/poem/poem.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatePoemComponent } from './poems/create-poem/create-poem.component';
import { UpdatePoemComponent } from './poems/update-poem/update-poem.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ErrorComponent } from './core/error/error.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        PoemComponent,
        LoginComponent,
        CreatePoemComponent,
        UpdatePoemComponent,
        PageNotFoundComponent,
        ErrorComponent,
        AppHomeComponent,
        MyProfileComponent
    ]
})
export class PagesModule { }
