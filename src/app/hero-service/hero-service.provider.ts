import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message-service/message.service";
import {HeroService} from "./hero-service";
import {FirebaseHeroService} from "./firebase-hero-service";
import {AngularFirestore} from "@angular/fire/firestore";
import {InMemoryHeroService} from "./in-memory-hero.service";
import {environment} from "../../environments/environment";

let heroServiceFactory = (httpClient: HttpClient, messageService: MessageService, firestore: AngularFirestore) => {
  messageService.add("Created heroService");
  if (environment.production)
    return new FirebaseHeroService(firestore);
  else
    return new InMemoryHeroService(httpClient, messageService);
};

export let heroServiceProvider =
  {
    provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [HttpClient, MessageService, AngularFirestore]
  };
