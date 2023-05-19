import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter<any>();

  registrationForm!: FormGroup;
  editEmployeeData: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Check if there are stored employee details in sessionStorage
    const storedEmployeeData = sessionStorage.getItem('editEmployeeData');
    if (storedEmployeeData) {
      this.editEmployeeData = JSON.parse(storedEmployeeData);
    }

    this.registrationForm = this.formBuilder.group({
      name: [this.editEmployeeData ? this.editEmployeeData.name : '', Validators.required],
      position: [this.editEmployeeData ? this.editEmployeeData.position : '', Validators.required],
      about: [this.editEmployeeData ? this.editEmployeeData.about : '', Validators.required],
      joiningDate: [this.editEmployeeData ? this.editEmployeeData.joiningDate : '', Validators.required]
    });

    // Clear the stored employee details from sessionStorage
    sessionStorage.removeItem('editEmployeeData');
  }

  submitForm() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const employeeData = this.registrationForm.value;
    this.formSubmitted.emit(employeeData);
  }
}
