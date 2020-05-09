import { Component, OnInit } from '@angular/core';
import { IPatient } from '../patient';
import { PatientService } from '../../services/patient.service';
import { DataService } from '../../services/data.service';
import { IPacient } from '../pacient';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { EditModalComponent } from '../../shared/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: `./patient-list.component.html`,
    styleUrls: [`./patient-list.component.css`]
})
export class PatientListComponent implements OnInit{
    
    pageTitle: string = 'Patient List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _filter: string;
    errorMessage: string;
    id: number;

    data: any[];
    pacients: IPacient[] = [];
    filteredPacients: IPacient[] = [];
    p: number = 1;

    
    constructor(private dataService:DataService, public dialog: MatDialog){
    }

    public get filter(): string {
        return this._filter;
    }

    public set filter(value: string) {
        this._filter = value;
        this.filteredPacients = this.filter ? this.applyFilter(this.filter) : this.pacients;
    }

    applyFilter (filterBy: string) : IPacient[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.pacients.filter((pacient : IPacient) =>
            pacient.family.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


    ngOnInit(): void {
     this.dataService.getPacientsData().subscribe(
        data => {
            this.data = data.entry.forEach(p => { 
                let pacient: IPacient = {
                    id: (this.isValid(p.resource)) ? (this.isValid(p.resource.id) ? p.resource.id : "") : "",
                    given: (this.isValid(p.resource)) ? (this.isValid(p.resource.name)) ? (this.isValid(p.resource.name[0].given) ? p.resource.name[0].given[0] : "") : "" : "",
                    family: (this.isValid(p.resource)) ? (this.isValid(p.resource.name)) ? (this.isValid(p.resource.name[0].family) ? p.resource.name[0].family : "") : "" : "",
                    prefix: (this.isValid(p.resource)) ? (this.isValid(p.resource.name)) ? (this.isValid(p.resource.name[0].prefix) ? p.resource.name[0].prefix : "") : "" : "",
                    phone: (this.isValid(p.resource)) ? (this.isValid(p.resource.telecom) ? (this.isValid(p.resource.telecom[0].value) ? p.resource.telecom[0].value : "") : "") : "",
                    text: (this.isValid(p.resource)) ? (this.isValid(p.resource.text) ? (this.isValid(p.resource.text.div) ? p.resource.text.div : "") : ""): "",
                    gender: (this.isValid(p.resource)) ? (this.isValid(p.resource.gender) ? p.resource.gender : "") : "",
                    birthDate: (this.isValid(p.resource)) ? (this.isValid(p.resource.birthDate) ? p.resource.birthDate : "") : "",
                    };
                
                this.pacients.push(pacient);                
            });
        },
        err => this.errorMessage = err 
    );

        this.filteredPacients = this.pacients;
    }

    isValid(field: any) : boolean{
        if (field != undefined && field != null) return true;
        return false;
    }

  openDialog(pacientId, pacientFirstName, pacientLastName, pacientGender): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '300px',
      data: {
        id: pacientId,
        firstName: pacientFirstName,
        lastName: pacientLastName,
        gender: pacientGender
      }
    });

    dialogRef.afterClosed().subscribe(
        data => {
            console.log(data);
            this.pacients.forEach(p=> {
                if (p.id == data.id){
                    p.gender = data.gender;
                    p.given = data.firstName;
                    p.family = data.lastName;
                }
            });
        }
    );  
  }
}