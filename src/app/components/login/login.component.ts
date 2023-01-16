import {Component, OnInit} from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
//import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth: AuthService, private router:Router) {
  }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
  }

  onSubmit():void {
    if (this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          this.router.navigate(['admin']);
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }
}
