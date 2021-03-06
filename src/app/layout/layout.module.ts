import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PublicComponent,
    PrivateComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
