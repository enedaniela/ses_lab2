import { Component, OnInit } from '@angular/core';
import { IMedication } from './medication';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DataService } from '../../services/data.service';

@Component({
    templateUrl: `./medication-list.component.html`,
    styleUrls: [`./medication-list.component.css`]
})
export class MedicationListComponent implements OnInit{
    
    pageTitle: string = 'Medication';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    private _filter: string;
    medicine: IMedication;
    filteredMedication : IMedication[] = [];

    medication: IMedication[] = [];
    data: any[];
    p: number = 1;
    
    constructor(private dataService : DataService){
    }

    ngOnInit(): void {
     this.dataService.getMedicationData().subscribe(
        data => {
            this.data = data[0].entry.forEach(p => { 
                let medicine: IMedication = {
                    id: (this.isValid(p.resource)) ? (this.isValid(p.resource.id) ? p.resource.id : "") : "",
                    name: (this.isValid(p.resource)) ? (this.isValid(p.resource.code)) ? (this.isValid(p.resource.code.text) ? p.resource.code.text : "") : "" : "",
                    text: (this.isValid(p.resource)) ? (this.isValid(p.resource.text) ? (this.isValid(p.resource.text.div) ? p.resource.text.div : "") : ""): "",
                    code: (this.isValid(p.resource)) ? (this.isValid(p.resource.code)) ? (this.isValid(p.resource.code.coding) ? (this.isValid (p.resource.code.coding[0].code) ? p.resource.code.coding[0].code : "") : "" ): "" : "",
                };
                
                this.medication.push(medicine);                
            });
            this.filteredMedication = this.medication;
        },
        err => this.errorMessage = err 
    );
    }

    isValid(field: any) : boolean{
        if (field != undefined && field != null) return true;
        return false;
    }

    set filter (value: string){
        this._filter = value;
        this.filteredMedication = this.filter ? this.applyFilter(this.filter) : this.medication;
    }

    get filter (){
        return this._filter;
    }

    applyFilter(byValue: string) : IMedication[]{
        byValue = byValue.toLocaleLowerCase();
        return this.medication.filter((m : IMedication) => m.name.toLocaleLowerCase().indexOf(byValue) != -1);
    }

}