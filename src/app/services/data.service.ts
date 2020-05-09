import { Injectable } from '@angular/core';
import { IPatient } from '../patients/patient';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export class DataService{
    private pacientsUrl =  './api/patients.json';
    private medicationUrl = './api/medication.json';
    private encountersUrl =  './api/encounters.json';
    private careplanUrl = './api/careplan.json';
    private appointmentsUrl =  './api/appointments.json';
    private allergiesUrl = './api/allergy_intolerance.json';

    constructor(private http : HttpClient){}
    getPacientsData() : any{
        return this.http.get<any[]>(this.pacientsUrl).pipe(
            catchError(this.handleError)
            );
    }

    getMedicationData() : any{
        return this.http.get<any[]>(this.medicationUrl).pipe(
            catchError(this.handleError)
            );
    }

    getCareplanData() : any{
        return this.http.get<any[]>(this.careplanUrl).pipe(
            catchError(this.handleError)
            );
    }

    getAllergiesData() : any{
        return this.http.get<any[]>(this.allergiesUrl).pipe(
            catchError(this.handleError)
            );
    }

    getEncountersData() : any{
        return this.http.get<any[]>(this.encountersUrl).pipe(
            catchError(this.handleError)
            );
    }

    getAppointmentsData() : any{
        return this.http.get<any[]>(this.appointmentsUrl).pipe(
            catchError(this.handleError)
            );
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