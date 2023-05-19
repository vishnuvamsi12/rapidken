import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  showRegistrationForm = false;
  showListView = false;
  showCardView = false;
  employeeList: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchQuery = '';
  filteredEmployees: any[] = [];

  isEmployeesPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadEmployeeList();
  }

  onSearch(query: string) {
    // Check for special characters
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    if (regex.test(query)) {
      this.router.navigate(['/error']);
      return;
    }

    this.searchQuery = query;
    this.filterEmployees();
  }

  toggleRegistrationForm() {
    this.showRegistrationForm = !this.showRegistrationForm;
  }

  switchToListView() {
    this.showListView = true;
    this.showCardView = false;
  }

  switchToCardView() {
    this.showListView = false;
    this.showCardView = true;
  }

  loadEmployeeList() {
    const storedEmployees = localStorage.getItem('employees');
    this.employeeList = storedEmployees ? JSON.parse(storedEmployees) : [];
    this.filterEmployees();
  }

  saveEmployeeList() {
    localStorage.setItem('employees', JSON.stringify(this.employeeList));
  }

  editEmployee(employee: any) {
    this.router.navigate(['login']).then(() => {
      sessionStorage.setItem('editEmployeeData', JSON.stringify(employee));
    });
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

  // onSearch(query: string) {
  //   this.searchQuery = query;
  //   this.filterEmployees();
  // }

  filterEmployees() {
    this.filteredEmployees = this.employeeList.filter((employee: any) =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
