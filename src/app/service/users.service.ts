import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.model';
import { ApiService } from './core/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public usersBS = new BehaviorSubject<User[]>([]);
  public updateUserSuccessStatusBS = new BehaviorSubject<boolean>(true);
  public addUserSuccessStatusBS = new BehaviorSubject<boolean>(true);

  constructor(private apiService: ApiService) { }

  public setAddUserSuccessStatusBS(value: boolean) {
    this.addUserSuccessStatusBS.next(value);
  }

  public getAddUserSuccessStatusBS(): Observable<boolean> {
    return this.addUserSuccessStatusBS.asObservable();
  }

  public getAddUserSuccessStatusBSValue(): boolean {
    return this.addUserSuccessStatusBS.getValue();
  }

  public setUpdateUserSuccessStatusBS(value: boolean) {
    this.updateUserSuccessStatusBS.next(value);
  }

  public getUpdateUserSuccessStatusBS(): Observable<boolean> {
    return this.updateUserSuccessStatusBS.asObservable();
  }

  public getUpdateUserSuccessStatusBSValue(): boolean {
    return this.updateUserSuccessStatusBS.getValue();
  }

  public setUsersBS(value: User[]) {
    this.usersBS.next(value);
  }

  public getUsersBS(): Observable<User[]> {
    return this.usersBS.asObservable();
  }

  public getUsersBSValue(): User[] {
    return this.usersBS.getValue();
  }

  public getUsersList(): Observable<User[]> {
    let url = environment.userServiceUrl.toString() + `users/getUsers`;
    return this.apiService.get<User[]>(url);
  }

  public getUserById(id: string): Observable<User> {
    let url = environment.userServiceUrl.toString() + `users/getUserById/${id}`;
    return this.apiService.get<User>(url);
  }

  public addUser(user: User): Observable<any> {
    let url = environment.userServiceUrl.toString() + `users/addNewUser`;
    return this.apiService.post<User>(url, user);
  }

  public updateUser(user: User): Observable<any> {
    let url = environment.userServiceUrl.toString() + `users/updateUser`;
    return this.apiService.put<User>(url, user);
  }

  public deleteUser(id: string): Observable<any> {
    let url = environment.userServiceUrl.toString() + `users/deleteUser?Id=${id}`;
    return this.apiService.delete<any>(url);
  }
}
