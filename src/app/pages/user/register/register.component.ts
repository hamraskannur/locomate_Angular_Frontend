import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  passwordShown = false;
  repeatPasswordShown = false;
  verify: string | null = null;
  ErrMessage: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phoneNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.passwordShown = !this.passwordShown;
  }

  toggleRepeatPasswordVisibility(): void {
    this.repeatPasswordShown = !this.repeatPasswordShown;
  }

  navigateToLogin(): void {
    // Implement the navigation to the login page here
  }

  onSubmit(): void {
    // Perform form submission and other logic here
    // Access form values using this.signupForm.value
  }

}
