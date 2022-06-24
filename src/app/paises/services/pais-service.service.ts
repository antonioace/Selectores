import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais, PaisFronteras } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaisServiceService {
  private _apiurl: string = 'https://restcountries.com/v2';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }
  constructor(private http: HttpClient) {}

  getPaisesPorRegion(region: string): Observable<Pais[]> {
    const url: string = `${this._apiurl}/region/${region}?fields=name,alpha3Code`;
    return this.http.get<Pais[]>(url);
  }

  getPaisesFrontera(codigoAlpha: string): Observable<PaisFronteras[]> {
    const url: string = `${this._apiurl}/alpha/${codigoAlpha}`;
    return this.http.get<PaisFronteras[]>(url);
  }
}
