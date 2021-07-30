import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Transaction } from './transaction';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    service = TestBed.inject(TransactionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of transactions', () => {
    const response = {
      data: [
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
      ]
    };
    const filter = { transaction_status: 'all', transaction_type: 'all' };
    service.get(filter).subscribe((transactions: Transaction[]) => {
      expect(transactions.length).toEqual(1);
      expect(transactions[0].date_creation).toEqual(1627698975);
    });
    const req = httpTestingController.expectOne('/marketplace/admin-transactions-per-status-and-type?transaction_status=all&transaction_type=all');
    expect(req.request.method).toEqual('GET');

    req.flush(response);
    httpTestingController.verify();
  });
});
