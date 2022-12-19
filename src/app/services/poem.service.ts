import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poem } from 'app/models/poem';
import { BASE_URL } from 'environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoemService {

  constructor(private http: HttpClient) { }

  getPoemById(id: String): Observable<Poem> {
    return this.http.get<Poem>(`${BASE_URL}poems/${id}`).pipe(retry(3))
  }

  getAllPoems(): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${BASE_URL}poems`).pipe(retry(3))
  }

  createPoem(poem: Poem): Observable<Poem> {
    let header = {
      "headers": new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.post<Poem>(`${BASE_URL}poems/`, JSON.stringify(poem), header).pipe(retry(3))
  }

  updatePoem(poem: Poem) {
    let header = {
      "headers": new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.patch<Poem>(`${BASE_URL}poems/${poem._id}`, JSON.stringify(poem), header).pipe(retry(3))
  }

  deletePoem(id:String){
    return this.http.delete<any>(`${BASE_URL}poems/${id}`).pipe(retry(3))
  }

  getAllPoemsByUser(userId: String):Observable<Poem[]> {
    return this.http.get<Poem[]>(`${BASE_URL}poems/search?userId=${userId}`)
  }

}
