import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AddProjectComponent } from './components/add-project/add-project.component';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'projects',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'add-project', component: AddProjectComponent },
    ],
  },
  
  { path: '**', redirectTo: '/login' },
];
