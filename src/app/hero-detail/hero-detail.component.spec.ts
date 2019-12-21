import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Location} from '@angular/common';

import {HeroDetailComponent} from './hero-detail.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Hero} from "../domain/hero";
import {HeroService} from "../hero-service/hero-service";

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroServiceSpy:jasmine.SpyObj<HeroService>;
  let locationSpy:jasmine.SpyObj<Location>;
  let hero = new Hero();

  beforeEach(async(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero', 'getHeroes','deleteHero','addHero','updateHero']);
    heroServiceSpy.getHeroes.and.returnValue(of([]));
    heroServiceSpy.getHero.and.returnValue(of(hero));

    locationSpy = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [HeroDetailComponent],
      providers: [{provide: HeroService, useValue: heroServiceSpy},
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get(): number {
                  return 1;
                }
              }
            }
          }
        },
        {provide: Location, useValue: locationSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when getHero called, getHero is also called on heroService', () => {
    component.getHero();
    expect(component.hero).toBe(hero);
    expect(heroServiceSpy.getHero.calls.any()).toEqual(true);
  });

  it('when back called, back is also called on location', () => {
    component.goBack();
    expect(locationSpy.back.calls.any()).toEqual(true);
  });

  it('when save called, updateHero is also called on heroService and back called on location', () => {
    heroServiceSpy.updateHero.and.returnValue(of(hero));
    component.save();
    expect(heroServiceSpy.updateHero.calls.any()).toEqual(true);
    expect(locationSpy.back.calls.any()).toEqual(true);
  });

});
