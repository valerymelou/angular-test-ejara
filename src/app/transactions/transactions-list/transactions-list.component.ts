import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Column } from 'src/app/shared/table/column';
import { DataSource } from 'src/app/shared/table/data-source';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  dataSource: DataSource<Transaction> = { data: [] };
  form = new FormGroup({
    transaction_status: new FormControl('all'),
    transaction_type: new FormControl('all')
  });
  transactionTypes = ['all', 'confirmed', 'pending', 'rejected'];
  transactionStatuses = ['all', 'buy', 'sell', 'send'];
  pageSize = 10;
  pageSizes = [10, 25, 50, 100];
  columns: Column[] = [
    {
      key: 'date_creation',
      label: 'Date',
      type: 'date'
    },
    {
      key: 'transaction_type',
      label: 'Transaction type',
      type: 'string'
    },
    {
      key: 'transaction_status',
      label: 'Transaction status',
      type: 'string'
    },
    {
      key: 'emitter',
      label: 'Emitter',
      type: 'string'
    },
    {
      key: 'receiver',
      label: 'Recipient',
      type: 'string'
    },
    {
      key: 'amount_raw',
      label: 'Raw amount',
      type: 'number'
    },
    {
      key: 'amount_net',
      label: 'Net amount',
      type: 'number'
    },
    {
      key: 'fiat_currency',
      label: 'Fiat currency',
      type: 'string'
    },
    {
      key: 'crypto_currency',
      label: 'Crypto currency',
      type: 'string'
    },
    {
      key: 'crypto_amount',
      label: 'Crypto amount',
      type: 'string'
    },
  ];
  loading = false;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.dataSource.data = [];
    this.loading = true;
    this.transactionService.get(this.form.value)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe((transactions) => {
      this.dataSource.data = transactions;
    });
  }

}
