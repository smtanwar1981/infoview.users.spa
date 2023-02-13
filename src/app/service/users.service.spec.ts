import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environment/environment';
import { getUserApiMockResponse } from '../mock-data/getUserApiMockResponse';
import { getUserByIdApiMockResponse } from '../mock-data/getUserByIdApiMockResponse';
import { User } from '../models/user.model';
import { ApiService } from './core/api.service';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ApiService] });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsersList() method should fetch list of users', () => {
    service = TestBed.inject(UsersService);
    service.getUsersList().subscribe(data => {
      expect(data).toEqual(getUserApiMockResponse);
    });
    const testReq = httpTestingController.expectOne(environment.userServiceUrl.toString() + `users/getUsers`);
    testReq.flush(getUserApiMockResponse);
  });

  it('getUserById() method should fetch user details by id', () => {
    let id: string = 'a4664973-7f63-4276-a1ec-cc0fd39eb823';
    service = TestBed.inject(UsersService);
    service.getUserById(id).subscribe(data => {
      expect(data).toEqual(getUserByIdApiMockResponse);
    });
    const testReq = httpTestingController.expectOne(environment.userServiceUrl.toString() + `users/getUserById/${id}`);
    testReq.flush(getUserByIdApiMockResponse);
  });

  it('addUser() method should add a user', () => {
    service = TestBed.inject(UsersService);
    let addUserRequest: User = {
      firstName: "test",
      lastName: "test user",
      email: "testuser@testing.com",
      isActive: true
    };

    service.addUser(addUserRequest).subscribe(data => {
      expect(data).toEqual(addUserRequest);
      expect(data.id).toBeDefined();
    });
    const testReq = httpTestingController.expectOne(environment.userServiceUrl.toString() + `users/addNewUser`);
    addUserRequest.id = 'a4664973-7f63-4276-a1ec-cc0fd39eb823';
    testReq.flush(addUserRequest);
  });

  it('updateUser() method should update a user', () => {
    service = TestBed.inject(UsersService);
    let userToUpdate: User = {
      id: "a4664973-7f63-4276-a1ec-cc0fd39eb823",
      firstName: "test",
      lastName: "test user",
      email: "testuser@testing.com",
      isActive: true
    };

    service.updateUser(userToUpdate).subscribe(data => {
      expect(data).toEqual(true);
    });
    const testReq = httpTestingController.expectOne(environment.userServiceUrl.toString() + `users/updateUser`);
    testReq.flush(true);
  });

  it('updateUser() method should update a user', () => {
    service = TestBed.inject(UsersService);
    let id: string = "a4664973-7f63-4276-a1ec-cc0fd39eb823";

    service.deleteUser(id).subscribe(data => {
      expect(data).toEqual(true);
    });
    const testReq = httpTestingController.expectOne(environment.userServiceUrl.toString() + `users/deleteUser?Id=${id}`);
    testReq.flush(true);
  });
});
