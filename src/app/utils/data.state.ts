import { setString, getString, hasKey, remove } from "@nativescript/core/application-settings";
import { BehaviorSubject, Observable } from "rxjs";

export class DataState {

  private user$ = new BehaviorSubject<string>('');
  private username$ = new BehaviorSubject<string>('');

  getUser(): Observable<string> {
    return this.user$.asObservable();
  }

  getUsername(): Observable<string> {
    return this.username$.asObservable();
  }

  setName(value: string): void {
    setString('name', value);
    this.user$.next(value);
  }
  
  set(name: string, value: string): void {
    setString(name, value);
  }

  get(name: string): string {
    return getString(name);
  }

  has(name: string): boolean {
    return hasKey(name);
  }

  remove(name: string): void {
    remove(name);
  }

}