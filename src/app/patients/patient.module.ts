import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { StarComponent } from '../shared/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import { PatientDetailModule } from './patient-detail/patient-detail.module';
import { EditModalComponent } from '../shared/edit-modal/edit-modal.component';
import { DataService } from '../services/data.service';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports:[
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        PatientDetailModule,
        RouterModule.forChild([
            { path: 'patients', component: PatientListComponent},
            { path: 'patients/:id',
            component: PatientDetailComponent,
            loadChildren: () => import('./patient-detail/patient-detail.module').then(m => m.PatientDetailModule)},
    ])
],

    declarations:[
        PatientListComponent,
        ConvertToSpacesPipe,
        StarComponent,
        PatientDetailComponent
    ],

    providers:[
        DataService,
        FormBuilder
    ]

})
export class PatientModule{}