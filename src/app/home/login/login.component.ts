import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
   });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const {email, password} = this.form.value;
    console.log(this.form);
    // if (this.form.status == 'VALID') {
      console.log('here')
      // this.authService.login(email, password);
      this.router.navigateByUrl('/panel');
    // }
    console.log('elo')
  }

}
