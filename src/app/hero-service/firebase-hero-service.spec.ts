import {FirebaseHeroService} from "./firebase-hero-service";
import {async, TestBed} from "@angular/core/testing";
import {heroServiceProvider} from "./hero-service.provider";
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreStub} from "./firestore-stub";
import {HeroService} from "./hero-service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HEROES} from "../message-service/mock-heroes";

describe('FirebaseHeroService', () => {
  let heroService: HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [heroServiceProvider, {
        provide: AngularFirestore, useValue: FirestoreStub
      }]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    heroService = TestBed.get(HeroService);
  });

  it('when all heroes requested should return expected heroes', () => {
    heroService.getHeroes().subscribe(heroes => {
      expect(heroes).toBe(HEROES);
    })
  });

  it('when new hero added should return expected hero', () => {
    heroService.addHero(FirestoreStub.hero).subscribe( hero => {
      expect(hero).toBe(FirestoreStub.hero);
    })
  });

  it('when hero updated should return expected hero', () => {
    heroService.updateHero(FirestoreStub.hero).subscribe( hero => {
      expect(hero).toBe(FirestoreStub.hero);
    })
  });

  it('when hero object deleted should return undefined hero', () => {
    heroService.deleteHero(FirestoreStub.hero).subscribe( hero => {
      expect(hero).toBeUndefined();
    })
  });

  it('when hero deleted by id should return undefined hero', () => {
    heroService.deleteHero(FirestoreStub.hero.id).subscribe( hero => {
      expect(hero).toBeUndefined();
    })});

  it('when searchstring is empty should return empty array', () => {
    heroService.searchHeroes("").subscribe( hero => {
      expect(hero).toEqual([]);
    })
  });

  it('when searchstring is not empty should return non array', () => {
    heroService.searchHeroes("name").subscribe( heroes => {
      expect(heroes.length).toEqual(1);
    })
  });

  it('when specific hero requested should return expected hero', () => {
    heroService.getHero("1").subscribe( hero => {
      expect(hero).toBe(FirestoreStub.hero);
    })
  });
});
