import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'https://thesimpsonsapi.com/api/characters';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}