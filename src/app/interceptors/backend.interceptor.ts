import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";
import { AnimalEvent, EditEventPayload, HttpMethods } from "../models";
import { MOCK_DATA } from "../mocks/data";

const HTTP_CALL_DELAY = 300;
let data = MOCK_DATA;

@Injectable()
class BackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    if (url.endsWith('/events')) {
      if (method === HttpMethods.Get) {
        return this.getEvents();
      }

      if (method === HttpMethods.Post) {
        return this.addEvent(body);
      }
    }

    if (url.match(/\/events\/\d+$/)) {
      const id = url.match(/\d+/)?.[0];

      if (method === HttpMethods.Patch) {
        return this.editEvent(id, body);
      }

      if (method === HttpMethods.Delete) {
        return this.deleteEvent(id);
      }
    }

    return next.handle(req);
  }

  private getEvents(): Observable<HttpEvent<any>> {
    return this.returnResult(data);
  }

  private addEvent(event: AnimalEvent): Observable<HttpEvent<any>> {
    return this.returnResult(data, () => {
      data.total += 1;
      data.result.unshift({
        ...event,
        eventId: (data.result[0]?.eventId ?? 0) + 1,
      });
    });
  }

  private deleteEvent(id: string | undefined): Observable<HttpEvent<any>> {
    const index = data.result.findIndex(event => event.eventId.toString() === id);

    if (index === -1) {
      // error handling here
      return this.returnResult(null);
    }

    return this.returnResult(data, () => {
      data.total -= 1;
      data.result = [...data.result.slice(0, index), ...data.result.slice(index + 1)]
    });
  }

  private editEvent(id: string | undefined, { key, value }: EditEventPayload): Observable<HttpEvent<any>> {
    const event = data.result.find(event => event.eventId.toString() === id);

    if (!event) {
      // error handling here
      return this.returnResult(null);
    }

    return this.returnResult(data, () => {
      event[key] = value;
    });
  }

  private returnResult(body: any, modifyDataFunc?: () => void) {
    return of(new HttpResponse({ status: 200, body }))
      .pipe(delay(HTTP_CALL_DELAY), tap(() => {
        modifyDataFunc?.();
      }));
  }
}

export const backendInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};
