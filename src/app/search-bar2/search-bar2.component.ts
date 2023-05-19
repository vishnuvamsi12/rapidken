import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar2',
  templateUrl: './search-bar2.component.html',
  styleUrls: ['./search-bar2.component.css']
})
export class SearchBar2Component {

  query: string = '';

  @Output() searchQuery = new EventEmitter<string>();

  onSearch() {
    this.searchQuery.emit(this.query);
  }

}
