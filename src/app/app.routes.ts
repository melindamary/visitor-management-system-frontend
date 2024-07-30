import { LocationChartComponent } from './ui/location-chart/location-chart.component';
import { LocationVisitortableComponent } from './ui/location-visitortable/location-visitortable.component';
import { PurposePieComponent } from './ui/purpose-pie/purpose-pie.component';
import { AdminACEDashbordComponent } from './pages/admin-ace-dashbord/admin-ace-dashbord.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthAdminGuard } from './core/guard/auth-admin.guard';
import { NavigationPanelComponent } from './layouts/navigation-panel/navigation-panel.component';
import { Component } from '@angular/core';
import { SecurityVisitorLogComponent } from './pages/security-visitor-log/security-visitor-log.component';
import { ReportTableComponent } from './pages/reports/components/report-table/report-table.component';
import { VisitorFormComponent } from './pages/visitor-form/visitor-form.component';
import { AuthSecurityGuard } from './core/guard/auth-security.guard';
import { AuthAceGuard } from './core/guard/auth-ace.guard';
import { AccessGuard } from './core/guard/access.guard';
import { AdminAddUserComponent } from './pages/Admin-Panel/user-management/components/admin-add-user/admin-add-user.component';
// import { AdminViewUserComponent } from './pages/admin-panel/user-management/components/admin-view-user/admin-view-user.component';
import { AdminEditUserComponent } from './pages/Admin-Panel/user-management/components/admin-edit-user/admin-edit-user.component';
import { UserManagementComponent } from './pages/Admin-Panel/user-management/user-management.component';
import { Routes } from '@angular/router';
import { ViewDetailsComponent } from './pages/reports/components/view-details/view-details.component';
import { AdminPanelComponent } from './pages/Admin-Panel/admin-panel.component';
import { AddroleComponent } from './ui/addrole/addrole.component';
import { EditroleComponent } from './ui/editrole/editrole.component';
import { TableComponent } from './shared-components/table/table.component';
import { AdminViewRoleComponent } from './pages/Role/admin-view-role/admin-view-role.component';
import { AdminViewIndividualUserComponent } from './pages/Admin-Panel/user-management/components/admin-view-individual-user/admin-view-individual-user.component';

export const routes: Routes = [
  {
    path: 'vms',
    component: NavigationPanelComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminACEDashbordComponent,
        // canActivate: [AuthAceGuard]
      },
      {
        path: 'visitor-log',
        component: SecurityVisitorLogComponent,
        canActivate: [AuthSecurityGuard],
      },
      {
        path: 'reports',
        component: ReportTableComponent,
        canActivate: [AccessGuard],
      },
      {
        path: 'admin-panel',
        component: AdminPanelComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path:'view-user',
        component:AdminViewIndividualUserComponent

      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        
      },
      {
        path: 'add-user',
        component: AdminAddUserComponent,
        
      },
      {
        path: 'edit-user',
        component: AdminEditUserComponent,
        
      },
      {
        path:'sharedtable',component:AdminViewRoleComponent
      },
      {
          path:'addrole',component:AddroleComponent
      },
      { path: 'editrole', component: EditroleComponent },
    ],
  },
  {
    path: 'details',
    component: ViewDetailsComponent,
  },
  {
    path: 'welcomepage',
    component: WelcomepageComponent,
  },
  {
    path: 'visitorform',
    component: VisitorFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  }
]





    
   
    
    

