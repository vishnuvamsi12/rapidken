import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query: string = '';

  @Output() searchQuery = new EventEmitter<string>();

  onSearch() {
    this.searchQuery.emit(this.query);
  }
}
