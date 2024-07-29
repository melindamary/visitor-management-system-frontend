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
import { AdminAddUserComponent } from './pages/admin-panel/user-management/components/admin-add-user/admin-add-user.component';
import { AdminViewUserComponent } from './pages/admin-panel/user-management/components/admin-view-user/admin-view-user.component';
import { AdminEditUserComponent } from './pages/admin-panel/user-management/components/admin-edit-user/admin-edit-user.component';
import { UserManagementComponent } from './pages/admin-panel/user-management/user-management.component';
import { Routes } from '@angular/router';
import { ViewDetailsComponent } from './pages/reports/components/view-details/view-details.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AddroleComponent } from './ui/addrole/addrole.component';
import { EditroleComponent } from './ui/editrole/editrole.component';
import { AdminViewRoleComponent } from './pages/admin-panel/role-management/admin-view-role/admin-view-role.component';
import { AdminVisitPurposeTableComponent } from './pages/admin-panel/visit-purpose-management/admin-visit-purpose-table/admin-visit-purpose-table.component';

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
          path:'add-role',component:AddroleComponent
      },
      { path: 'edit-role', component: EditroleComponent },
      {
        path:'visit-purpose',component: AdminVisitPurposeTableComponent
      }
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





    
   
    
    

