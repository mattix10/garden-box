import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirm:['']
   });
  }

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }

  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.markAllAsTouched();

    const {email, password} = this.form.value;

    if (this.form.valid) {
      console.log(this.form.value)
      this.authService.registration(email, password).subscribe(data => {
        console.log(data),
        () => {
          this.errorMessage = 'Nieprawidłowe dane. Spróbuj ponownie.';
        }
      });
      // this.router.navigateByUrl('/panel');
    }

  }

}
