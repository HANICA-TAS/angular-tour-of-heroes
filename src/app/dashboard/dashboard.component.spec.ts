import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {DashboardComponent} from './dashboard.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HeroSearchComponent} from '../hero-search/hero-search.component';
import {HttpClientModule} from '@angular/common/http';
import {of} from "rxjs";
import {HEROES} from "../message-service/mock-heroes";
import {HeroService} from "../hero-service/hero-service";
import {LoginComponent} from "../login/login.component";
import {AngularFireAuthStub} from "../login/login.component.spec";
import {AngularFireAuth} from "@angular/fire/auth";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroServiceSpy:jasmine.SpyObj<HeroService>;

  beforeEach(async(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    heroServiceSpy.getHeroes.and.returnValue(of(HEROES));

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpClientModule ],
      declarations: [ DashboardComponent, HeroSearchComponent, LoginComponent ],
      providers: [{provide: AngularFireAuth, useValue: AngularFireAuthStub},{ provide: HeroService, useValue: heroServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with last heroes 1 till 5', () => {
    component.getHeroes();
    expect(component.heroes.length).toBe(4);
    expect(heroServiceSpy.getHeroes.calls.any()).toEqual(true);
  });
});
