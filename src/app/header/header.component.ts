import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  isEmployeesPage: boolean = false;

  employeeList: any[] = [];
  searchQuery = '';
  filteredEmployees: any[] = [];

  showListView = false;
  currentPage = 1;
  itemsPerPage = 10;
  showRegistrationForm = false;
  showCardView = false;

  constructor(private router: Router) {}

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterEmployees();
  }

  filterEmployees() {
    this.filteredEmployees = this.employeeList.filter((employee: any) =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    // Clear the login status from local storage
    localStorage.removeItem('isLoggedIn');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';
  
    // Check if the current page is the employees page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isEmployeesPage = event.url === '/employees';
        if (this.isEmployeesPage) {
          this.loadEmployeeList();
        }
      }
    });
  }
  
  loadEmployeeList() {
    const storedEmployees = localStorage.getItem('employees');
    this.employeeList = storedEmployees ? JSON.parse(storedEmployees) : [];
  }


  editEmployee(employee: any) {
    this.router.navigate(['login']).then(() => {
      sessionStorage.setItem('editEmployeeData', JSON.stringify(employee));
    });
  }

  deleteEmployee(employee: any) {
    const index = this.employeeList.indexOf(employee);
    if (index !== -1) {
      this.employeeList.splice(index, 1);
      this.saveEmployeeList();
      this.loadEmployeeList();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  getPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  saveEmployee(employeeData: any) {
    const storedEmployees = localStorage.getItem('employees');
    let employees = storedEmployees ? JSON.parse(storedEmployees) : [];

    const storedEmployeeData = sessionStorage.getItem('editEmployeeData');
    if (storedEmployeeData) {
      const editedEmployee = JSON.parse(storedEmployeeData);
      const index = employees.findIndex((emp: any) => emp.id === editedEmployee.id);

      if (index !== -1) {
        employees[index] = { ...editedEmployee, ...employeeData };
      }
    } else {
      employees.push(employeeData);
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    sessionStorage.removeItem('editEmployeeData');

    this.showRegistrationForm = false;
    this.loadEmployeeList();
  }
  
  saveEmployeeList() {
    localStorage.setItem('employees', JSON.stringify(this.employeeList));
  }

  switchToListView() {
    this.showListView = true;
    this.showCardView = false;
  }

  switchToCardView() {
    this.showListView = false;
    this.showCardView = true;
  }

}
