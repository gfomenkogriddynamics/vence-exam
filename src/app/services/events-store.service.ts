import { Injectable, Signal, signal } from '@angular/core';
import { AnimalEvent } from "../models";

@Injectable({
  providedIn: 'root'
})
export class EventsStoreService {
  private readonly _events = signal<AnimalEvent[]>([]);
  private readonly _isLoading = signal(false);

  get events(): Signal<AnimalEvent[]> {
    return this._events.asReadonly()
  }

  get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly()
  }

  setEvents(events: AnimalEvent[]): void {
    this._events.set(events);
  }

  setIsLoading(isLoading: boolean): void {
    this._isLoading.set(isLoading);
  }
}
