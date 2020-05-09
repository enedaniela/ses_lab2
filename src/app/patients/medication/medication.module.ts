import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MedicationListComponent } from './medication-list.component';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports:[
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'medication', component: MedicationListComponent},
        ])
    ],
    declarations:[
        MedicationListComponent,
    ]

})
export class MedicationModule{}