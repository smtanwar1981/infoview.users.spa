import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersTableGridComponent } from './components/users-table-grid/users-table-grid.component';
import { getUserByIdApiMockResponse } from './mock-data/getUserByIdApiMockResponse';
import { UsersService } from './service/users.service';

describe('AppComponent', () => {
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [UsersService, HttpClient, HttpHandler]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar .toolbar-title')?.textContent).toContain('INFOVIEW User SPA Application');
  });

  it('should have ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.ngOnInit).toBeTruthy();
  });

  it('should have ngOnDestroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.ngOnDestroy).toBeTruthy();
  });

  it('should have addNewUserEventEmitterHandler() method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.addNewUserEventEmitterHandler).toBeTruthy();
  });

  it('should have deleteUserEventEmitterHandler() method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.deleteUserEventEmitterHandler).toBeTruthy();
  });

  it('should have updateUserEventEmitterHandler() method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.updateUserEventEmitterHandler).toBeTruthy();
  });

  it('should show empty template message when no user(s) being fetched', () => {
    
  });
});
