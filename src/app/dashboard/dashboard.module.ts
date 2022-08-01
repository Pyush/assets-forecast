import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../utilities/modules/shared.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./asset-forecast/asset-forecast.module').then(m => m.AssetForecastModule)
      },
      {
        path: 'asset-test',
        loadChildren: () => import('./asset-test/asset-test.module').then(m => m.AssetTestModule)
      }
    ]
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DashboardModule {}
