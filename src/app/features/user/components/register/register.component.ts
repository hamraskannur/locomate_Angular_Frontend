import { Component, OnInit,OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { registerResponse } from 'src/app/core/models/interface';
import { UserApiServiceService } from '../../services/user-api.service.service';
import { ToastrServiceService } from '../../services/toastr.service';
import { passwordPattern } from 'src/app/constants/patterns';
import { Subscription } from 'rxjs';


declare const particlesJS: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit ,OnDestroy{
  constructor(
    private formBuilder: FormBuilder,
    private userApiServiceService: UserApiServiceService,
    private toastrService: ToastrServiceService
  ) {}
  loading = false;
  submit: boolean = false;
  passwordShown = false;
  verify: string = '';
  ErrMessage: string | null = null;
  subscription: Subscription | undefined;


  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(passwordPattern),
      ],
    ],
  });
  get f() {
    return this.signupForm.controls;
  }

  togglePasswordVisibility(): void {
    this.passwordShown = !this.passwordShown;
  }

  onSubmit(): void {
    this.submit = true;
    if (this.signupForm.valid) {
      this.loading = true;
   this.subscription=this.userApiServiceService
        .userRegister(this.signupForm.value)
        .subscribe(({ status, message }: registerResponse) => {
          if (status) {
            this.loading = false;
            this.toastrService.showSuccess(message);
            this.verify = message;
            this.ErrMessage = null;
            this.signupForm.reset();
            this.submit = false
          } else {
            this.loading = false;
            this.ErrMessage = message;
          }
        });
    }
  }

  ngOnInit(): void {
   this.initializeParticles()
   setTimeout(() => {
    this.initializeParticles()
   }, 1000);
  }
    initializeParticles(){
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
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
