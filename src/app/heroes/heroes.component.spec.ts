import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HeroService} from '../hero.service';
import {of} from 'rxjs';
import {Hero} from "../hero";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroServiceSpy:jasmine.SpyObj<HeroService>;

  beforeEach(async(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero', 'getHeroes','deleteHero','addHero']);
    heroServiceSpy.getHeroes.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getHeroes on heroService', () => {
    component.getHeroes();
    expect(heroServiceSpy.getHeroes.calls.any()).toEqual(true);
  });

  it('should call deleteHero on heroService', () => {
    let hero = new Hero();
    heroServiceSpy.deleteHero.and.returnValue(
      of(hero)
    );
    component.heroes.push(hero);
    expect(component.heroes.length).toBe(1);

    component.delete(hero);
    expect(heroServiceSpy.deleteHero.calls.any()).toEqual(true);
    expect(component.heroes.length).toBe(0);

  });

  it('should not call addHero on heroService when name is empty', () => {
    expect(component.heroes.length).toBe(0);
    component.add("");
    expect(heroServiceSpy.addHero.calls.any()).toEqual(false);
    expect(component.heroes.length).toBe(0);
  });

  it('should call addHero on heroService when name is not empty', () => {
    expect(component.heroes.length).toBe(0);
    let hero = new Hero();
    heroServiceSpy.addHero.and.returnValue(of(hero));
    component.add("NOT EMPTY");
    expect(heroServiceSpy.addHero.calls.any()).toEqual(true);
    expect(component.heroes.length).toBe(1);
  });
});
