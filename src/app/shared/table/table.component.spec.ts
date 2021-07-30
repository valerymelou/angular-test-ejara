import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Column } from './column';

import { TableComponent } from './table.component';

const columns: Column[] = [
  {
    key: 'firstName',
    label: 'First name',
    type: 'string'
  },
  {
    key: 'lastName',
    label: 'Last name',
    type: 'string'
  },
  {
    key: 'age',
    label: 'Age',
    type: 'number'
  }
];

const data = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 34
  },
  {
    firstName: 'Ella',
    lastName: 'Smith',
    age: 50
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 30
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 30
  }
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = columns;
    component.source = {
      data: data
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort the table in ascending order', () => {
    const theadElement = fixture.debugElement.query(By.css('thead tr th'));

    expect(component.source.data[0].firstName).toEqual('John');
    expect(component.source.data[1].firstName).toEqual('Ella');
    expect(component.source.data[2].firstName).toEqual('Jane');

    theadElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.source.data[0].firstName).toEqual('Ella');
    expect(component.source.data[1].firstName).toEqual('Jane');
    expect(component.source.data[2].firstName).toEqual('Jane');

    theadElement.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.source.data[0].firstName).toEqual('John');
    expect(component.source.data[1].firstName).toEqual('Jane');
    expect(component.source.data[2].firstName).toEqual('Jane');
  });

  it('should navigate to next page', () => {
    component.pageSize = 1;
    fixture.detectChanges();

    const nextPageButton = fixture.debugElement.query(By.css('.page-link.next'));
    nextPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(2);

    nextPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(3);

    nextPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(4);

    nextPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(4);
  });

  it('should navigate to previous page', () => {
    component.pageSize = 4;
    component.currentPage = 4;
    fixture.detectChanges();

    const previousPageButton = fixture.debugElement.query(By.css('.page-link.previous'));
    previousPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(3);

    previousPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(2);

    previousPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(1);

    previousPageButton.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.currentPage).toEqual(1);
  });

  it('should change current page to 1', () => {
    component.pageSize = 4;
    component.currentPage = 4;
    fixture.detectChanges();

    const changes= {
      pageSize: {
        currentValue: 1,
        previousValue: 2,
        firstChange: true,
        isFirstChange: () => true
      }
    };

    component.ngOnChanges(changes);

    expect(component.currentPage).toEqual(1);
  });

  it('should change not current page', () => {
    component.pageSize = 4;
    component.currentPage = 4;
    fixture.detectChanges();

    const changes= {
      currentPage: {
        currentValue: 1,
        previousValue: 2,
        firstChange: true,
        isFirstChange: () => true
      }
    };

    component.ngOnChanges(changes);

    expect(component.currentPage).toEqual(4);
  });
});
