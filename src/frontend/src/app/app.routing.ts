import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './guards/index';

import { DummyComponent } from './dummy/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'dummy', component: DummyComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);