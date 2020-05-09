import { OnInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPacient } from './../pacient';
import { DataService } from '../../services/data.service';

@Component({
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

    pageTitle: string = 'Pacient Details';
    pacient: IPacient;
    currentPacient: IPacient;
    pacients : IPacient[];
    errorMessage: string;
    data: any[];
    showCareplan: boolean;
    showEncounters: boolean;
    showAllergies: boolean;
    showAppointments: boolean;
    id: string;

    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService){

    }
    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.dataService.getPacientsData().subscribe(
            data => {
                this.data = data[0].entry.forEach(p => { 
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
                    
                    if (pacient.id == this.id){
                        this.currentPacient = pacient; 
                    }          
                });
                console.log(this.currentPacient);
            },
        );
    }

    onBack() : void{
        this.router.navigate(['/patients']);
    }

    isValid(field: any) : boolean{
        if (field != undefined && field != null) return true;
        return false;
    }

    setTab(tabname: string) {
        this.router.navigate([ `${tabname}/`+ this.currentPacient.id]);
      }    
}