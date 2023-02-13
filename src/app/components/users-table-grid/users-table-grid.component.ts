import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ACTIVESTATUSDDLVALUE, USERTABLECONSTANTS, VALIDATIONMESSAGES } from 'src/app/common/constants';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-table-grid',
  templateUrl: './users-table-grid.component.html',
  styleUrls: ['./users-table-grid.component.scss']
})
export class UsersTableGridComponent implements OnInit, OnDestroy {
  @Input() users: User[] = [];
  @Output() deleteUserEventEmitter = new EventEmitter();
  @Output() addNewUserEventEmitter = new EventEmitter();
  @Output() updateUserEventEmitter = new EventEmitter();

  public userTableConstants = USERTABLECONSTANTS;
  public validationMessages = VALIDATIONMESSAGES;
  public activeStatusDdlValue = ACTIVESTATUSDDLVALUE;
  public userForm: FormGroup = Object.assign({});
  public selectedUserForEdit: User = {} as User;
  public isEditModeOn: boolean = false;
  public isAddModeOn: boolean = false;
  public formSubmitted: boolean = false;
  private destroyed$: Subject<any> = new Subject();

  constructor(private _formBuilder: FormBuilder,
    private _userService: UsersService) {
  }

  ngOnInit(): void {
    this.initializeUserForm();
    this.setApiCallSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  public editUser(user: User) {
    if (Object.keys(this.selectedUserForEdit).length === 0) {
      this.selectedUserForEdit = user;
      this.isEditModeOn = true
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive
      })
    }
  }

  public addnewUserHandler() {
    this.users.unshift({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      isActive: false
    });
    this.selectedUserForEdit = this.users[0];
    this.isAddModeOn = true;
  }

  public upsertUserHandler() {
    if (!this.isEditModeOn) {
      let newUser: User = {
        firstName: this.userForm.value.firstName!,
        lastName: this.userForm.value.lastName!,
        email: this.userForm.value.email,
        isActive: JSON.parse(this.userForm.value.isActive)
      };
      this.addNewUserEventEmitter.emit(newUser);
    } else {
      let userToUpdate: User = {
        id: this.selectedUserForEdit.id,
        firstName: this.userForm.value.firstName!,
        lastName: this.userForm.value.lastName!,
        email: this.userForm.value.email,
        isActive: JSON.parse(this.userForm.value.isActive)
      };
      this.updateUserEventEmitter.emit(userToUpdate);
    }
  }

  public cancelUpdateUserHandler() {
    if (confirm('Are you sure you want to cancel?')) {
      this.users = this._userService.getUsersBSValue();
    }
    if (this.isAddModeOn) {
      this.users.splice(0, 1);
    }
    this.isEditModeOn = false;
    this.isAddModeOn = false;
    this.selectedUserForEdit = {} as User;
    this.userForm.reset();
  }

  public deleteUser(index: number) {
    this.deleteUserEventEmitter.emit(this.users[index].id)
  }

  private setApiCallSubscriptions() {
    this._userService.getUpdateUserSuccessStatusBS()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(status => {
        if (status) {
          this.selectedUserForEdit = {} as User;
          this.isEditModeOn = !status;
          this.userForm.reset();
        }
      });
    this._userService.getAddUserSuccessStatusBS()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(status => {
        this.selectedUserForEdit = {} as User;
        this.isAddModeOn = !status;
      });
  }

  private initializeUserForm() {
    this.userForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isActive: []
    });
  }
}
