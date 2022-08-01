import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/utilities/modules/shared.module";
import { AssetTestComponent } from "./asset-test.component";

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: AssetTestComponent,
    },
  ];
  
  @NgModule({
    declarations: [AssetTestComponent],
    imports: [RouterModule.forChild(routes), SharedModule],
  })
  export class AssetTestModule {}
  