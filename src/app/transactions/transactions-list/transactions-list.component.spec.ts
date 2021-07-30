import { Component, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Column } from 'src/app/shared/table/column';
import { DataSource } from 'src/app/shared/table/data-source';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

import { TransactionsListComponent } from './transactions-list.component';

@Component({
  selector: 'app-table',
  template: ''
})
class TableMockComponent {
  @Input() columns: Column[] = [];
  @Input() loading = false;
  @Input() source: DataSource<any> = { data: [] };
  @Input() pageSize = 10;
}

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;
  const transactions: Transaction[] = [
    {
      date_creation: 1627698975,
      transaction_type: 'buy',
      transaction_status: 'rejected',
      amount_raw: 41251.6,
      amount_net: 50000,
      fiat_currency: 'XAF',
      crypto_currency: 'BTC',
      crypto_amount: 1.64
    }
  ];

  beforeEach(async () => {
    const transactionServiceMock = jasmine.createSpyObj('TransactionService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ TransactionsListComponent, TableMockComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: TransactionService,
          useValue: transactionServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    transactionServiceSpy = TestBed.inject(TransactionService) as jasmine.SpyObj<TransactionService>;
    transactionServiceSpy.get.and.returnValue(of(transactions));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
