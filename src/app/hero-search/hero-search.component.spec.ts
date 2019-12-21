import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeroSearchComponent} from './hero-search.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HEROES} from "../message-service/mock-heroes";
import {of} from "rxjs";
import {HeroService} from "../hero-service/hero-service";

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroServiceSpy:jasmine.SpyObj<HeroService>;

  beforeEach(async(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    heroServiceSpy.searchHeroes.and.returnValue(of(HEROES));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [HeroSearchComponent],
      providers: [{provide: HeroService, useValue: heroServiceSpy}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call searchHeroes eventually when search is called', fakeAsync(() => {
    fixture.detectChanges();
    component.heroes$.subscribe(data => {
      expect(data).toBe(HEROES);
      expect(heroServiceSpy.searchHeroes.calls.any()).toEqual(true);
    });
    component.search("search");
    tick(300);
  }));
});
