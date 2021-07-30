import { NgModule } from '@angular/core';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TransactionsListComponent
  ],
  imports: [
    SharedModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
