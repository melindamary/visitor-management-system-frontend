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
import { SecurityVisitorLogComponent } from './pages/security-visitor-log/security-visitor-log.component';
import { ReportTableComponent } from './pages/reports/components/report-table/report-table.component';
import { VisitorFormComponent } from './pages/visitor-form/visitor-form.component';
import { AuthSecurityGuard } from './core/guard/auth-security.guard';
import { AuthAceGuard } from './core/guard/auth-ace.guard';
import { AccessGuard } from './core/guard/access.guard';

export const routes: Routes = [
    {
        path:"vms", 
        component: NavigationPanelComponent,
        children: [
            {path: "dashboard", component: AdminACEDashbordComponent, 
                canActivate: [AuthAceGuard]},
            {path: "visitor-log", component: SecurityVisitorLogComponent, 
               canActivate: [AuthSecurityGuard]
            },
            {path: "reports", component: ReportTableComponent,
                canActivate: [AccessGuard],
            },
           
            // {
            //     path:"admin-panel",
            //     canActivate: [authAdminGuard],
            // }
        ]
    },
    { 
        path:'welcomepage',
        component:WelcomepageComponent
    },
    {
        path: "visitorform", component: VisitorFormComponent, 
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
    },
    {
        path:'visitorform',component:VisitorFormComponent
    }

];
