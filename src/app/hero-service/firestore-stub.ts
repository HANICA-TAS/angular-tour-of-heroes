import {BehaviorSubject} from "rxjs";
import {HEROES} from "../message-service/mock-heroes";
import {Hero} from "../domain/hero";
import {FieldPath} from "@angular/fire/firestore";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export const FirestoreStub = {
  hero: new Hero("1"),
  collection: (_name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject(FirestoreStub.hero),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      add: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
  doc: (_name: string) => ({
    valueChanges: () => new BehaviorSubject(FirestoreStub.hero),
    collection: (_name: string) => ({
      valueChanges: () => new BehaviorSubject(HEROES),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      add: (_d: any) => ({
        then: (f) =>
          f({id:"1"})
        ,
      }),
      doc: (_d: any) => ({
        update: (_d: any) => new Promise((resolve, _reject) => resolve()),
        delete: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
      update: (_d: any) => ({
        then: (f) =>
          f([{data: () => ({id:"1", name: "NAME"})}])
        ,
      }),
      ref: ({
        where: (_fieldPath: string | FieldPath,_opStr: WhereFilterOp,_value: any) => ({
          get: () => ({
            then: (f) =>
              f([{data: () => ({id:"1", name: "NAME"})}])
            ,
          })
        }),
      }),
    }),
    delete: (_d: any) => new Promise((resolve, _reject) => resolve()),
  }),
};
