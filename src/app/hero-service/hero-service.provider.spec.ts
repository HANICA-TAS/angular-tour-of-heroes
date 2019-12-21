import {async, TestBed} from "@angular/core/testing";
import {HeroService} from "./hero-service";
import {heroServiceProvider} from "./hero-service.provider";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {InMemoryHeroService} from "./in-memory-hero.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreStub} from "./firestore-stub";
import {environment} from "../../environments/environment";
import {FirebaseHeroService} from "./firebase-hero-service";

describe('HeroServiceProvider', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],providers: [heroServiceProvider, {
        provide: AngularFirestore, useValue: FirestoreStub
      }]
    })
      .compileComponents();
  }));
  it('should create an in memory heroservice when prod = false', () => {
    environment.production = false;
    let service = TestBed.get(HeroService);
    expect(service instanceof InMemoryHeroService).toBe(true);
  });

  it('should create an in memory heroservice when prod = true', () => {
    environment.production = true;
    let service = TestBed.get(HeroService);
    expect(service instanceof FirebaseHeroService).toBe(true);
  });
});
