import { Injectable } from "@angular/core";
import { Usermodel } from '../models/user'; 
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Userservice {

  private apiUrl = 'http://localhost:5005/api/Users';

  constructor(private http: HttpClient) { }

  addUser(user: Usermodel): Observable<Usermodel> {
    return this.http.post<Usermodel>(this.apiUrl, user);
  }

  getUserById(id: number): Observable<Usermodel> {
    return this.http.get<Usermodel>(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<Usermodel[]> {
    return this.http.get<Usermodel[]>(this.apiUrl);
  }

  updateUser(id: number, user: Usermodel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}