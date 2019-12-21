import {InMemoryHeroService} from './in-memory-hero.service';
import {Hero} from "../domain/hero";
import {defer} from "rxjs";
import {MessageService} from "../message-service/message.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from "@angular/core/testing";

describe('InMemoryHeroService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let heroService: InMemoryHeroService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    heroService = new InMemoryHeroService(httpClientSpy, messageServiceSpy);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
  });

  it('when all heroes requested should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes: Hero[] = [{ id: "1", name: 'A' }, { id: "2", name: 'B' }];

    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));
    heroService.getHeroes().subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHeroes, 'expected heroes');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('when new hero added should return expected hero (HttpClient called once)', () => {
    const expectedHero: Hero = { id: "1", name: 'A' };

    httpClientSpy.post.and.returnValue(asyncData(expectedHero));
    heroService.addHero(expectedHero).subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHero, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('when hero updated should return expected hero (HttpClient called once)', () => {
    const expectedHero: Hero = { id: "1", name: 'A' };

    httpClientSpy.put.and.returnValue(asyncData(expectedHero));
    heroService.updateHero(expectedHero).subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHero, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('when hero object deleted should return expected hero (HttpClient called once)', () => {
    const expectedHero: Hero = { id: "1", name: 'A' };

    httpClientSpy.delete.and.returnValue(asyncData(expectedHero));
    heroService.deleteHero(expectedHero).subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHero, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('when hero deleted by id should return expected hero (HttpClient called once)', () => {
    const expectedHero: Hero = { id: "1", name: 'A' };

    httpClientSpy.delete.and.returnValue(asyncData(expectedHero));
    heroService.deleteHero('1').subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHero, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('when searchstring is empty should return empty array and not call HttpClient', () => {
    const expectedHeroes: Hero[] = [];
    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));
    heroService.searchHeroes("").subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHeroes, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(0);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(0, 'one call');
  });

  it('when searchstring is not empty should return non array and call HttpClient once', () => {
    const expectedHeroes: Hero[] = [{ id: "1", name: 'A' }, { id: "2", name: 'AB' }];
    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));
    heroService.searchHeroes("A").subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHeroes, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('when specific hero requested should return expected hero (HttpClient called once)', () => {
    const expectedHero: Hero = { id: "1", name: 'A' };

    httpClientSpy.get.and.returnValue(asyncData(expectedHero));
    heroService.getHero("1").subscribe(
      heroes =>
      {
        expect(heroes).toEqual(expectedHero, 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('when http client throws error, handleError is called, empty array is returned and errors are logged', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    heroService.getHeroes().subscribe(
      heroes =>
      {
        expect(heroes).toEqual([], 'expected hero');
        expect(messageServiceSpy.add.calls.count()).toBe(1);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
