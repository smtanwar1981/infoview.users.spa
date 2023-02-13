import { Component, OnDestroy, OnInit } from '@angular/core';
import { pipe, Subject, take, takeUntil } from 'rxjs';
import { User } from './models/user.model';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<any> = new Subject();
  public users: User[] = [];

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.setUserServiceSubscription();
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  public addNewUserEventEmitterHandler(user: User) {
    this.userService.addUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        if (data) {
          alert('User added.');
          this.getUsers();
          this.userService.setAddUserSuccessStatusBS(true);
        } else {
          alert('Unable to add user, please try again.');
          this.userService.setAddUserSuccessStatusBS(false);
        }
      },
        error => {
          if (error?.error?.errorMessage)
            this.userService.setAddUserSuccessStatusBS(false);
        });
  }

  public deleteUserEventEmitterHandler(id: string) {
    this.userService.deleteUser(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        if (data) {
          alert('User deleted.');
          this.getUsers();
        } else {
          alert('Unable to delete user, please try again.');
        }
      });
  }

  public updateUserEventEmitterHandler(user: User) {
    this.userService.updateUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        if (data) {
          alert('User updated.');
          this.getUsers();
          this.userService.setUpdateUserSuccessStatusBS(true);
        } else {
          alert('Unable to update user, please try again.');
          this.userService.setUpdateUserSuccessStatusBS(false);
        }
      },
        error => {
          if (error?.error?.errorMessage)
            this.userService.setUpdateUserSuccessStatusBS(false);
        });
  }

  private getUsers() {
    this.userService.getUsersList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: User[]) => {
        if (data && data.length > 0) {
          this.userService.setUsersBS(this.transformUsersList(data));
        }
      });
  }

  private setUserServiceSubscription() {
    this.userService.getUsersBS()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.users = data;
      });
  }

  private transformUsersList(data: User[]): User[] {
    data.map(item => item.isEdit = false);
    return data;
  }
}
