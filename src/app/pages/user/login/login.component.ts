import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Credentials} from "../../../models/interface"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth: any;
  Toast: any;
  constructor(private fb: FormBuilder, private router: Router) {}

  //declare variable
  modal: boolean = false;
  submit: boolean = false;
  fpsubmit: boolean = false;
  fpData!: Credentials;
  otpFlag: boolean = false;
  phoneNumber: string = '';
  isLoading: boolean = false;
  password: boolean = false;
  otp: string[] = ['', '', '', '', '', ''];

  ngOnInit(): void {
    const currentRoute = this.router.url;
    if (currentRoute == '/register' || currentRoute == '/login') {
      const topNav = document.getElementById('top-nav') as HTMLElement;
      topNav.classList.add('hidden');
    }
  }
  public mobilePattern = 'this.this.mobilePattern';
  public passwordPattern="this.this.passwordPattern";

  //interface of formdata
  registrationForm = this.fb.group({
    mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
  });
  get f() {
    return this.registrationForm.controls;
  }

  //interface of formdata
  forgotPassword = this.fb.group({
    mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
    password: ['', Validators.required],
  });

  get p() {
    return this.forgotPassword.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.registrationForm.valid) {
      // Access the form data
      const formData = this.registrationForm.value;
      // Send the form data to the server
      // this.studentService.login(formData).subscribe((result: any) => {
      //   if (result.status) {
      //     localStorage.setItem('studentjwt', result.token); // 1 days expiration
      //     this.toastr.success('successfully logged', '');
      //     const topNav = document.getElementById('top-nav') as HTMLElement;
      //     topNav.classList.remove('hidden');
      //     this.router.navigate(['/']);
      //   } else {
      //     this.toastr.error(result.message, '');
      //   }
      // }, (error: any) => {
      //   this.authService.handleError(error.status)
      // });
    }
  }



}
