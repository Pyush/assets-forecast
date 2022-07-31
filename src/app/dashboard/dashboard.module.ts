import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../utilities/modules/shared.module';
import { DashboardComponent } from './dashboard.component';
import { AssetForecastComponent } from './asset-forecast/asset-forecast.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
     // { path: '', redirectTo: '/asset-forecast', pathMatch: 'full'},
      {
        path: '',
        loadChildren: () => import('./asset-forecast/asset-forecast.module').then(m => m.AssetForecastModule)
      }
    ]
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DashboardModule {}
