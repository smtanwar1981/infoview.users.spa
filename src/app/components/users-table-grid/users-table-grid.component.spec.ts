import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { getUserApiMockResponse } from 'src/app/mock-data/getUserApiMockResponse';
import { UsersService } from 'src/app/service/users.service';

import { UsersTableGridComponent } from './users-table-grid.component';

describe('UsersTableGridComponent', () => {
  let component: UsersTableGridComponent;
  let fixture: ComponentFixture<UsersTableGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersTableGridComponent],
      providers: [UsersService, HttpClient, HttpHandler, FormBuilder],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.users = getUserApiMockResponse;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.ngOnInit).toBeTruthy();
  });

  it('should have ngOnDestroy', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.ngOnDestroy).toBeTruthy();
  });

  it('should have editUser', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.editUser).toBeTruthy();
  });

  it('should have addnewUserHandler', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.addnewUserHandler).toBeTruthy();
  });

  it('should have upsertUserHandler', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.upsertUserHandler).toBeTruthy();
  });

  it('should have cancelUpdateUserHandler', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.cancelUpdateUserHandler).toBeTruthy();
  });

  it('should have deleteUser', () => {
    const fixture = TestBed.createComponent(UsersTableGridComponent);
    const app = fixture.componentInstance;
    expect(app.deleteUser).toBeTruthy();
  });

  it('deleteUserEventEmitter should emit on deleteUser() method call', () => {
    spyOn(component.deleteUserEventEmitter, 'emit');
    component.deleteUser(1);
    expect(component.deleteUserEventEmitter.emit).toHaveBeenCalled();
  });

  it('addNewUserEventEmitter should emit on upsertUserHandler() method call', () => {
    component.isEditModeOn = false;
    spyOn(component.addNewUserEventEmitter, 'emit');
    component.upsertUserHandler();
    expect(component.addNewUserEventEmitter.emit).toHaveBeenCalled();
  });

  it('updateUserEventEmitter should emit on upsertUserHandler() method call', () => {
    component.isEditModeOn = true;
    spyOn(component.updateUserEventEmitter, 'emit');
    component.upsertUserHandler();
    expect(component.updateUserEventEmitter.emit).toHaveBeenCalled();
  });
});
