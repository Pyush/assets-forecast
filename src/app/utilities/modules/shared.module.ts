import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http.service';

const AllSharedModules = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule,
  HttpClientModule,
  MaterialModule,
];

const AllProviders = [
  HttpService
]

@NgModule({
  imports: [AllSharedModules],
  exports: [AllSharedModules],
  providers: [AllProviders]
})
export class SharedModule {}
