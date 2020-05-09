import { Component, OnInit } from '@angular/core';
import { ICarePlan } from './careplan';
import { Router, PRIMARY_OUTLET } from '@angular/router';
import { DataService } from '../../services/data.service';
import { IEncounter } from '../encounters/encounter';

@Component({
  selector: 'pm-careplan',
  templateUrl: './careplan.component.html',
  styleUrls: ['./careplan.component.css']
})
export class CareplanComponent implements OnInit {
  id: number;
  data: any[];
  careplans : ICarePlan[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    let state = this.router.routerState.snapshot;
    this.id = +this.router.parseUrl(state.url).root.children[PRIMARY_OUTLET].segments[1].path;

    this.dataService.getCareplanData().subscribe(
      data => {
          this.data = data[0].entry.forEach(p => { 
              let careplan: ICarePlan = {
                  id: (this.isValid(p.resource)) ? (this.isValid(p.resource.id) ? p.resource.id : "") : "",
                  subjectRef: (this.isValid(p.resource)) ? (this.isValid(p.resource.subject)) ? (this.isValid(p.resource.subject.reference) ? p.resource.subject.reference.split('/').pop() : "") : "" : "",
                  start: (this.isValid(p.resource)) ? (this.isValid(p.resource.period)) ? (this.isValid(p.resource.period.start) ? p.resource.period.start : "") : "" : "",
                  name: (this.isValid(p.resource)) ? (this.isValid(p.resource.category)) ? (this.isValid(p.resource.category[0].text) ? p.resource.category[0].text : "") : "" : "", 
                };
              
              if (careplan.subjectRef == this.id){
                this.careplans.push(careplan);
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
