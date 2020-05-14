import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message-service/message.service";
import {HeroService} from "./hero-service";
import {InMemoryHeroService} from "./in-memory-hero.service";
import {environment} from "../../environments/environment";

let heroServiceFactory = (httpClient: HttpClient, messageService: MessageService) => {
  messageService.add("Created heroService");
  if (environment.production)
    throw new Error("Not implemented yet");
  else
    return new InMemoryHeroService(httpClient, messageService);
};

export let heroServiceProvider =
  {
    provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [HttpClient, MessageService]
  };
