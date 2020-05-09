import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot, PRIMARY_OUTLET } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IEncounter } from './encounter';

@Component({
  selector: 'pm-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css']
})
export class EncountersComponent implements OnInit {

  id: number;
  data: any[];
  encounters : IEncounter[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    let state = this.router.routerState.snapshot;
    if(this.router.parseUrl(state.url).root.children[PRIMARY_OUTLET])
      this.id = +this.router.parseUrl(state.url).root.children[PRIMARY_OUTLET].segments[1].path;

    this.dataService.getEncountersData().subscribe(
      data => {
          this.data = data[0].entry.forEach(p => { 
              let encounter: IEncounter = {
                  id: (this.isValid(p.resource)) ? (this.isValid(p.resource.id) ? p.resource.id : "") : "",
                  pacientRef: (this.isValid(p.resource)) ? (this.isValid(p.resource.subject)) ? (this.isValid(p.resource.subject.reference) ? p.resource.subject.reference.split('/').pop() : "") : "" : "",
                  start: (this.isValid(p.resource)) ? (this.isValid(p.resource.period)) ? (this.isValid(p.resource.period.start) ? p.resource.period.start : "") : "" : "",
                  };
              
              if (encounter.pacientRef == this.id){
                this.encounters.push(encounter);
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