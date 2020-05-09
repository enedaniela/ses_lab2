import { Component, OnInit } from '@angular/core';
import { IAllergy } from './allergy_intolerance';
import { Router, PRIMARY_OUTLET } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'pm-allergy-intolerances',
  templateUrl: './allergy-intolerances.component.html',
  styleUrls: ['./allergy-intolerances.component.css']
})
export class AllergyIntolerancesComponent implements OnInit {

  id: number;
  data: any[];
  allergies : IAllergy[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    let state = this.router.routerState.snapshot;
    this.id = +this.router.parseUrl(state.url).root.children[PRIMARY_OUTLET].segments[1].path;

    this.dataService.getAllergiesData().subscribe(
      data => {
          this.data = data[0].entry.forEach(p => { 
              let allergy: IAllergy = {
                  id: (this.isValid(p.resource)) ? (this.isValid(p.resource.id) ? p.resource.id : "") : "",
                  pacientRef: (this.isValid(p.resource)) ? (this.isValid(p.resource.patient)) ? (this.isValid(p.resource.patient.reference) ? p.resource.patient.reference.split('/').pop() : "") : "" : "",
                  cathegory: (this.isValid(p.resource)) ? (this.isValid(p.resource.category)) ? (this.isValid(p.resource.category[0]) ? p.resource.category[0] : "") : "" : "",
                  criticality: (this.isValid(p.resource)) ? (this.isValid(p.resource.criticality)) ? p.resource.criticality : "" : "",
                  allergicAt: (this.isValid(p.resource)) ? (this.isValid(p.resource.code)) ? (this.isValid(p.resource.code.coding) ? p.resource.code.coding[0].display : "") : "" : "",
                  recDate: (this.isValid(p.resource)) ? (this.isValid(p.resource.recDate) ? p.resource.recDate : "") : "",
              };
              
              if (allergy.pacientRef == this.id){
                this.allergies.push(allergy);
              }     
          });
      },
  );
    }

  isValid(field: any) : boolean{
    if (field != undefined && field != null) return true;
    return false;
}


}
