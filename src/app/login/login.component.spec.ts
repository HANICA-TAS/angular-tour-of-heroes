import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

let loggedOut = false;
export const AngularFireAuthStub = {
  auth: {
    signInWithPopup: (_provider:any) => ({
      then: (f) =>
        f({user: {}})
    }),
    signOut: () =>
      loggedOut = true
  },
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy:jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{ provide: AngularFireAuth, useValue: AngularFireAuthStub },
        {provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to dashboard after login', () => {
    component.login();
    expect(routerSpy.navigate.calls.any()).toEqual(true);
  });

  it('should signout after logout', () => {
    component.logout();
    expect(loggedOut).toBe(true);
  });


});
