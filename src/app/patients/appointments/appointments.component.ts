import { Component, OnInit } from '@angular/core';
import { Router, PRIMARY_OUTLET } from '@angular/router';
import { DataService } from '../../services/data.service';
import { IAppointment } from './appointment';

@Component({
  selector: 'pm-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  id: number;
  data: any[];
  appointments : IAppointment[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    let state = this.router.routerState.snapshot;
    this.id = +this.router.parseUrl(state.url).root.children[PRIMARY_OUTLET].segments[1].path;

    this.dataService.getAppointmentsData().subscribe(
      data => {
          this.data = data[0].entry.forEach(p => { 
              let appointment: IAppointment = {
                  id: (this.isValid(p.resource)) ? (this.isValid(p.resource.id) ? p.resource.id : "") : "",
                  pacientRef: (this.isValid(p.resource)) ? (this.isValid(p.resource.participant)) 
                            ? (this.isValid(p.resource.participant[0].actor)) 
                            ? (this.isValid(p.resource.participant[0].actor.reference)) 
                            ? p.resource.participant[0].actor.reference.split('/').pop() : "" : "" : "" : "",
                  practitionerRef: (this.isValid(p.resource)) ? (this.isValid(p.resource.participant)) 
                            ? (this.isValid(p.resource.participant[1]))
                            ? (this.isValid(p.resource.participant[1].actor)) 
                            ? (this.isValid(p.resource.participant[1].actor.reference)) 
                            ? p.resource.participant[1].actor.reference.split('/').pop() : "" : "" : "" : "" : "d",
                  start: (this.isValid(p.resource)) ? (this.isValid(p.resource.start) ? p.resource.start : "") : "",
                  end: (this.isValid(p.resource)) ? (this.isValid(p.resource.end) ? p.resource.end : "") : "",
              };
              
              if (appointment.pacientRef == this.id){
                this.appointments.push(appointment);
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
