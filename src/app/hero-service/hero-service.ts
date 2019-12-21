import {Observable} from "rxjs";
import {Hero} from "../domain/hero";

export abstract class HeroService {
  abstract getHeroes(): Observable<Hero[]>;
  abstract getHero(id: number): Observable<Hero>;
  abstract searchHeroes(term: string): Observable<Hero[]>;
  abstract addHero(hero: Hero): Observable<Hero>;
  abstract updateHero(hero: Hero): Observable<any>;
  abstract deleteHero(hero: Hero | number): Observable<Hero>;
}
