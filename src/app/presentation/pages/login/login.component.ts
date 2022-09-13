import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/domain/models/user/user';
import { UserUseCases } from 'src/app/domain/usecase/user_user_case';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  isSubmitted: boolean;


  subs: Subscription[] = [];
  messageError: String | null = null;
  constructor(
    public formBuilder: FormBuilder, private router: Router,
    private userCaseUse: UserUseCases
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
    this.isSubmitted = false;


  }

  ngOnInit(): void {
    this.subs.push(
      this.userCaseUse.getUser().subscribe(user => {
        if (user != null) {
          this.router.navigateByUrl('/')
        }
      })
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onLogin() {
    this.isSubmitted = true;
    if (!this.form.valid) {

      return;
    }
    this.subs.push(
      /*  this.userCaseUse.onlogin(this.form.get('username')?.value, this.form.get('password')?.value).subscribe((user: User) => {
         console.log(user)
         // gurd y voy al task
         this.userCaseUse.saveUser(user)
 
         //me logeo
       }, err => {
         console.log("error", err)
         this.messageError = err;
         //muestro mensaje de errr
 
       }) */
      this.userCaseUse.onlogin(this.form.get('username')?.value, this.form.get('password')?.value).subscribe({
        next: (value: User) => {
          console.log(value)
          // gurd y voy al task
          this.userCaseUse.saveUser(value)
          this.router.navigateByUrl('/task')

        },
        error: (err) => {
          console.log("error", err)
          this.messageError = err;
        }
      })

    )


  }
  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe()
    });

  }

}
