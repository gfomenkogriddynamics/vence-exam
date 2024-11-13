import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnimalEvent, EditEventPayload, ListResponse } from "../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsHttpService {
  private readonly apiPrefix = '/events';

  http = inject(HttpClient);

  getList(): Observable<ListResponse<AnimalEvent>> {
    return this.http.get<ListResponse<AnimalEvent>>(this.apiPrefix)
  }

  addEvent(event: Partial<AnimalEvent>): Observable<AnimalEvent> {
    return this.http.post<AnimalEvent>(this.apiPrefix, event)
  }

  deleteEvent(id: number): Observable<AnimalEvent> {
    return this.http.delete<AnimalEvent>(`${this.apiPrefix}/${id}`)
  }

  editEvent(id: number, payload: EditEventPayload): Observable<AnimalEvent> {
    return this.http.patch<AnimalEvent>(`${this.apiPrefix}/${id}`, payload)
  }
}
