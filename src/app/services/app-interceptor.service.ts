import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AppInterceptorService implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap({
        error: (error) => {
          if(error.status == 404) {
            this.router.navigate(['/not-found']);
          }
        }
      })
    )
  }
}