import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Column } from './column';
import { DataSource } from './data-source';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() columns: Column[] = [];
  @Input() loading = false;
  @Input() source: DataSource<any> = { data: [] };
  @Input() pageSize = 10;
  currentPage = 1;
  sortBy = '';
  sortDirection = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageSize) {
      this.currentPage = 1;
    }
  }

  sort(key: string) {
    this.sortBy = key;
    if (this.sortDirection === '' || this.sortDirection === 'DESC') {
      this.sortDirection = 'ASC';
    }
    else if (this.sortDirection === 'ASC') {
      this.sortDirection = 'DESC';
    }

    const isDescending = this.sortDirection === 'DESC';

    this.source.data.sort((row1, row2) => {
      if (row1[key] === row2[key]) return 0;

      return (row1[key] > row2[key]) ? (isDescending ? -1 : 11) : (isDescending ? 1 : -1) ;
    });
  }

  nextPage(): void {
    if (this.currentPage + 1 * this.pageSize <= this.source.data.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage - 1 > 0) {
      this.currentPage--;
    }
  }
}
