import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {Observable, onErrorResumeNext} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}

)
export class PatientDetailGuard implements CanActivate {

    constructor(private router: Router){

    }
    canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let id = +next.url[1].path;
        if(isNaN(id) || id < 1){
            alert("Invalid patient id");
            this.router.navigate(['/patients']);
            return false;
        }
        return true;
    }
}