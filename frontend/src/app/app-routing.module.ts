import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/views/pages/error/error.component';
import { HomeComponent } from './components/views/pages/home/home.component';
import { MembersComponent } from './components/views/pages/members/members.component';
import { TithesComponent } from './components/views/pages/tithes/tithes.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'members',
        component: MembersComponent,
    },
    {
        path: 'tithes',
        component: TithesComponent,
    },
    {
        path: '**',
        component: ErrorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
