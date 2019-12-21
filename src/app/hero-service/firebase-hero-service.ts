import {HeroService} from "./hero-service";
import {Hero} from "../domain/hero";
import {Observable, of, Subject} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Band} from "../domain/band";

export class FirebaseHeroService extends HeroService {
  private _band = "alterbridge";
  private _path = 'heroes/5aq3A62p8cMx9MmUKahF';
  private emptyHero: Hero;
  private heroesCollection:AngularFirestoreCollection<Hero>;
  private heroes:Hero[];

  constructor(private afs: AngularFirestore) {
    super();
    this.heroesCollection = this.afs.doc<Band>(this._path).collection<Hero>(this._band);
    this.heroesCollection.valueChanges().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  addHero(hero: Hero): Observable<Hero> {
    let sendResult = new Subject<Hero>();
    this.heroesCollection.add(hero).then((docRef) => {
      this.heroesCollection.doc(docRef.id).update({
        id: docRef.id
      }).then(() => {
        hero.id = docRef.id;
        sendResult.next(hero);
      })
    });
    return sendResult.asObservable();
  }

  deleteHero(hero: Hero | string): Observable<Hero> {
    this.afs.doc<Hero>(this._path + "/" + this._band + "/" + hero).delete().then();
    return of(this.emptyHero);
  }

  getHero(id: string): Observable<Hero> {
    return this.afs.doc<Hero>(this._path + "/" + this._band + "/" + id).valueChanges();
  }

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    let foundHeroes:Hero[] = [];
    this.heroesCollection.ref.where("name", "==", term).get().then(snapshot => {
      snapshot.forEach(hero => {
        foundHeroes.push(hero.data() as Hero);
      });
    });
    return of(foundHeroes);
  }

  updateHero(hero: Hero): Observable<any> {
    this.heroesCollection.doc<Hero>(hero.id.toString()).update(hero).then();
    return of(hero);
  }
}
