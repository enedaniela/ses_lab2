import { Injectable } from '@angular/core';
import { IPatient } from '../patients/patient';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService{
    private patientUrl = 'https://alexgr.ro/ehealth/patients.json';
    constructor(private http : HttpClient){}
    getPatients() : Observable<IPatient[]>{
        return this.http.get<IPatient[]>(this.patientUrl);
    }
    

    private handleError (err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occurred: ${err.error.message}`;
        }else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}