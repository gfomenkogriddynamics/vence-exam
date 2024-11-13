import { inject, Injectable } from '@angular/core';
import { EventsStoreService } from "./events-store.service";
import { EventsHttpService } from "./events-http.service";
import { AnimalEvent, EditEventPayload, ListResponse } from "../models";
import { catchError, Observable, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsFacadeService {
  store = inject(EventsStoreService);
  http = inject(EventsHttpService);

  events = this.store.events;
  isLoading = this.store.isLoading;

  getList(): void {
    this.store.setIsLoading(true);
    this.http.getList()
      .pipe(this.handleError())
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }

  addEvent(event: Partial<AnimalEvent>): void {
    this.store.setIsLoading(true);
    this.http.addEvent(event)
      .pipe(
        switchMap(() => this.http.getList()),
        this.handleError(),
      )
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }

  editEvent(id: number, payload: EditEventPayload): void {
    this.store.setIsLoading(true);
    this.http.editEvent(id, payload)
      .pipe(
        switchMap(() => this.http.getList()),
        this.handleError(),
      )
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }

  deleteEvent(id: number): void {
    this.store.setIsLoading(true);
    this.http.deleteEvent(id)
      .pipe(
        switchMap(() => this.http.getList()),
        this.handleError(),
      )
      .subscribe(({ result }) => {
        this.store.setEvents(result);
        this.store.setIsLoading(false);
      })
  }

  private handleError() {
    return catchError<ListResponse<AnimalEvent>, Observable<{ result: [] }>>(error => {
      console.error('Error fetching events:', error);
      return of({ result: [] });
    })
  }
}
