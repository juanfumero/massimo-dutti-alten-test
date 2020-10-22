import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpResponse } from "@angular/common/http";


import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RequestCacheService } from './requestCache.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
const TTL = 10;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cache: RequestCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cachedResponse = this.cache.get(req.url);
        return cachedResponse
            ? of(cachedResponse)
            : this.sendRequest(req, next);
    }

    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(tap(event => {
        if (event instanceof HttpResponse) {
            this.cache.set(req.url, event, TTL);
        }
    }));
    }
}
