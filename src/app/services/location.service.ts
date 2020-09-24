import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  getStates() {
    return this.http.get('/assets/json/states.min.json')
  }

  getCities() {
    return this.http.get('/assets/json/cities.min.json')
  }

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get('/assets/json/cities.min.json').pipe(
      map((cities: any[]) => cities.filter(city => city.state_id === stateId)),
    )
  }

  getStateById(stateId: number): Observable<any> {
    return this.http.get('/assets/json/states.min.json').pipe(
      map((states: any[]) => states.filter(state => state.id === stateId))
    )
  }

  getCityById(cityId: number): Observable<any> {
    return this.http.get('/assets/json/cities.min.json').pipe(
      map((cities: any[]) => cities.filter(city => city.id === cityId))
    )
  }
}
