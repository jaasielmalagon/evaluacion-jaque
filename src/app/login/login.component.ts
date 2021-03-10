import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  @Input() error: string | null;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.form.value.username === "admin" && this.form.value.password === "admin") {
        localStorage.setItem('session', JSON.stringify(true));
        alertify.success('Bienvenido Admin')
        this.router.navigate(['/admin-users']);
      }
    } else {
      alertify.error('Usuario y/o contraseña incorrectos')
    }
  }

}