import {async, TestBed} from "@angular/core/testing";
import {HeroService} from "./hero-service";
import {heroServiceProvider} from "./hero-service.provider";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {InMemoryHeroService} from "./in-memory-hero.service";
import {environment} from "../../environments/environment";

describe('HeroServiceProvider', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],providers: [heroServiceProvider]
    })
      .compileComponents();
  }));
  it('should create an in memory heroservice when prod = false', () => {
    environment.production = false;
    let service = TestBed.get(HeroService);
    expect(service instanceof InMemoryHeroService).toBe(true);
  });
});
