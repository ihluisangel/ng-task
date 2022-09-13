import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/models/user/user';
import { UserUseCases } from 'src/app/domain/usecase/user_user_case';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public form: FormGroup;
  isSubmitted: boolean;
  listTask: any[];

  user$: Observable<User | null> | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private userCaseUse: UserUseCases,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
    });
    this.isSubmitted = false;
    this.listTask = []
  }

  ngOnInit(): void {
    this.user$ = this.userCaseUse.getUser()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSave() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    var task =
      { "id": this.listTask.length, "name": this.form.get('name')?.value, "check": false }
    this.addToList(task)
    this.onReset();
    // añado a mi lista

  }
  addToList(task: any) {
    this.listTask.push(task)
  }

  removeTask(task: any) {
    let idx = this.listTask.findIndex((e: any) => e.id == task.id);
    this.listTask.splice(idx, 1)
  }
  onReset(): void {
    this.isSubmitted = false;
    this.form.reset();
  }

  keyOnlyAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  onLogout() {

    this.userCaseUse.removeUser()
    this.router.navigateByUrl("/login")

  }


}
