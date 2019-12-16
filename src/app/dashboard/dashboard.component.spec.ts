import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HttpClientModule } from '@angular/common/http';
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {HEROES} from "../mock-heroes";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    class HeroServiceStub {}

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpClientModule ],
      declarations: [ DashboardComponent, HeroSearchComponent ],
      providers: [{ provide: HeroServiceStub, useClass: HeroServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with last heroes 1 till 5', () => {
    const heroServiceSpy = fixture.debugElement.injector.get(HeroService);
    const spy = spyOn(heroServiceSpy, 'getHeroes').and.returnValue(
      of(HEROES)
    );
    component.getHeroes();
    expect(component.heroes.length).toBe(4);
    expect(spy.calls.any()).toEqual(true);
  });
});
