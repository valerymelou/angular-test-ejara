import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  get(filter: any): Observable<Transaction[]> {
    let params = new HttpParams();
    for (const key in filter) {
      params = params.set(key, filter[key]);
    }

    return this.http.get<Transaction[]>('/marketplace/admin-transactions-per-status-and-type', { params }).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
