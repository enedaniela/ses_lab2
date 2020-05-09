import { Injectable } from '@angular/core';
import { IPatient } from '../patients/patient';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService{
    private pacientsUrl =  '/assets/patients.json';
    private medicationUrl = '/assets/medication.json';
    private encountersUrl =  '/assets/encounters.json';
    private careplanUrl = '/assets/careplan.json';
    private appointmentsUrl =  '/assets/appointments.json';
    private allergiesUrl = '/assets/allergy_intolerance.json';

    constructor(private http : HttpClient){}
    getPacientsData() : any{

      const post$:Observable<any[]> = this.http.get<any[]>('/assets/patients.json');
        return post$.pipe(
            catchError(this.handleError)
            );
    }

    getMedicationData() : any{
            const post$:Observable<any[]> = this.http.get<any[]>('/assets/medication.json');
        return post$.pipe(
            catchError(this.handleError)
            );
    }

    getCareplanData() : any{
            const post$:Observable<any[]> = this.http.get<any[]>('/assets/careplan.json');
        return post$.pipe(
            catchError(this.handleError)
            );
    }

    getAllergiesData() : any{
            const post$:Observable<any[]> = this.http.get<any[]>('/assets/allergy_intolerance.json');
        return post$.pipe(
            catchError(this.handleError)
            );
    }

    getEncountersData() : any{
        const post$:Observable<any[]> = this.http.get<any[]>('/assets/encounters.json');
        return post$.pipe(
            catchError(this.handleError)
            );
    }

    getAppointmentsData() : any{
        const post$:Observable<any[]> = this.http.get<any[]>('/assets/appointments.json');
        return post$.pipe(
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