import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncountersComponent } from '../encounters/encounters.component';
import { CareplanComponent } from '../careplan/careplan.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { AllergyIntolerancesComponent } from '../allergy-intolerances/allergy-intolerances.component';
import { EditModalComponent } from 'src/app/shared/edit-modal/edit-modal.component';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: EncountersComponent},
            { path: 'encounters', component: EncountersComponent},
            { path: 'careplan', component: CareplanComponent},
            { path: 'appointments', component: AppointmentsComponent},
            { path: 'allergies', component: AllergyIntolerancesComponent},
        ])
    ],
    declarations:[
        CareplanComponent,
        AppointmentsComponent,
        EncountersComponent,
        AllergyIntolerancesComponent,
    ]

})
export class PatientDetailModule{}