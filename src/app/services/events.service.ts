import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyEvent } from '../interfaces/myevent'; 

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEvent[]>(this.baseUrl); 
  }

  getEventById(id: string): Observable<MyEvent> {
    return this.http.get<MyEvent>(`${this.baseUrl}/${id}`); 
  }

  createEvent(event: MyEvent): Observable<MyEvent> {
    return this.http.post<MyEvent>(this.baseUrl, event); 
  }

  updateEvent(id: string, event: MyEvent): Observable<MyEvent> {
    return this.http.put<MyEvent>(`${this.baseUrl}/${id}`, event); 
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}