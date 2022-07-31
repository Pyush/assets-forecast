import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/utilities/modules/shared.module';
import { AssetForecastComponent } from './asset-forecast.component';

const routes: Routes = [
  {
    path: '',
    component: AssetForecastComponent,
  },
];

@NgModule({
  declarations: [AssetForecastComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class AssetForecastModule {}
