import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './gaurds/auth.guard';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard], children: [
        { path: 'events', component: EventListComponent },
        { path: 'events/new', component: EventFormComponent },
        { path: 'events/:id/edit', component: EventFormComponent },
        { path: 'events/:id', component: EventDetailComponent },
        { path: '', redirectTo: 'events', pathMatch: 'full' } 
    ]},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' } // Fallback route for invalid URLs
];
