import { Routes } from '@angular/router';
import { LocationChartComponent } from './ui/location-chart/location-chart.component';
import { LocationVisitortableComponent } from './ui/location-visitortable/location-visitortable.component';
import { PurposePieComponent } from './ui/purpose-pie/purpose-pie.component';
import { AdminACEDashbordComponent } from './pages/admin-ace-dashbord/admin-ace-dashbord.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { EditaddcomponetComponent } from './ui/editaddcomponet/editaddcomponet.component';
import { LocationSecurityTableComponent } from './ui/location-security-table/location-security-table.component';

export const routes: Routes = [
{
    path:'location-chart',component:LocationChartComponent
},
{
    path:'location-visitortable',component:LocationVisitortableComponent
},
{
    path:'pie-charts',component:PurposePieComponent
},
{
    path:'amaindashbord',component:AdminACEDashbordComponent
},
{
    path:'welcomepage',component:WelcomepageComponent
},
{
    path:'EditaddcomponetComponent',component:EditaddcomponetComponent
},
{
    path:'',component:LocationSecurityTableComponent
}
];
