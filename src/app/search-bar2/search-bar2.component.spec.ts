import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBar2Component } from './search-bar2.component';

describe('SearchBar2Component', () => {
  let component: SearchBar2Component;
  let fixture: ComponentFixture<SearchBar2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBar2Component]
    });
    fixture = TestBed.createComponent(SearchBar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
