import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Credentials, loginResponse} from "../../../models/interface"
import {  passwordPattern} from '../../../constants/patterns'
import { UserApiServiceService } from 'src/app/services/user-api.service.service';
import { ToastrServiceService } from 'src/app/services/toastr.service';

declare const particlesJS: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private userApiServiceService:UserApiServiceService, private router: Router,private toastrService:ToastrServiceService) {}

  //declare variable
  submit: boolean = false;
  passwordShown: boolean = false;
  ErrMessage: string | null = null;

  
  //interface of formdata
  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
  });
  get f() {
    return this.registrationForm.controls;
  }


  onSubmit() {
    this.submit = true;    
    if (this.registrationForm.valid) {
      this.userApiServiceService.userLogin(this.registrationForm.value).subscribe(({token,message,status}:loginResponse)=>{
           if(status){
            localStorage.setItem("token", token)
            this.ErrMessage=null
            this.router.navigate(['/']);
            this.toastrService.showSuccess("logined successfully")
           }else{
            this.ErrMessage=message
           }
      })
    }
  }

  togglePasswordVisibility(){
   this.passwordShown=!this.passwordShown;
  }

  ngOnInit(): void {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#0d47a1',
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#xxxxxx',
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 200,
          color: '#000000',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }

}
