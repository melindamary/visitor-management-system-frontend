import { Routes } from '@angular/router';
import { LocationChartComponent } from './ui/location-chart/location-chart.component';
import { LocationVisitortableComponent } from './ui/location-visitortable/location-visitortable.component';
import { PurposePieComponent } from './ui/purpose-pie/purpose-pie.component';
import { AdminACEDashbordComponent } from './pages/admin-ace-dashbord/admin-ace-dashbord.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { EditaddcomponetComponent } from './ui/editaddcomponet/editaddcomponet.component';
import { LoginComponent } from './pages/login/login.component';
import { authAdminGuard } from './core/guard/auth-admin.guard';
import { NavigationPanelComponent } from './layouts/navigation-panel/navigation-panel.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {
        path:"vms", 
        component: NavigationPanelComponent, 
        // canActivate: [authAdminGuard],
        children: [
            {path: "dashboard", component: AdminACEDashbordComponent},
            {path:"addandeditrole",component: EditaddcomponetComponent}
        ]
    },
    { 
        path:'welcomepage',
        component:WelcomepageComponent
    },
    { 
        path:"login", 
        component: LoginComponent 
    },
    { 
        path:"", 
        redirectTo: "/login", 
        pathMatch: "full" 
    },
    {
        path:"**",
        redirectTo: "/dashboard", 
    }

];
