import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
  });
}

  get fval() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
    return;
    }
    this.loading = true;
    this.authenticationService.login(this.fval.email.value, this.fval.password.value)
    .subscribe(
    data => {
      console.log("data::",data.user)
    this.router.navigate(['/home']);
    this.authenticationService.userdetail(data.user).subscribe(
      userdata => {
        console.log("user data::",userdata)
      },
      error => {
        console.log("user data error::",error)
      } 
    )
    },
    error => {
    // this.toastr.error(error.error.message, 'Error');
    this.router.navigate(['/']);
    console.log("errr:::",error.error.detail)
    this.loading = false;
    });
    }
}
