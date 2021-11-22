import { HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    TOKEN_HEADER_KEY = 'Authorization';
    constructor(private token: UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let authReq = req;
        const token = this.token.getToken();

        if(token != null){
            authReq = req.clone({headers: req.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders =[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];