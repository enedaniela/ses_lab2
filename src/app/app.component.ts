import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { PatientService } from './services/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';

@Component({
  selector: 'pm-root',
  template:`
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="icon-bar nav">
      <a class="nav-link" [routerLink]="['patients']"><i class="fa fa-search"></i></a>
      <a class="nav-link" [routerLink]="['medication']"><i class="fa fa-medkit"></i></a>
  </div>
  <div class = 'container'>
  <router-outlet></router-outlet>
  </div>
  `,

  styleUrls: [`./app.component.css`],
  providers: [DataService, PatientService]
})
export class AppComponent {
  pageTitle: string = 'eHealth';
}