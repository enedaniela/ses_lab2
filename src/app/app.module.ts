import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './patients/home/welcome.component';
import { RouterModule } from '@angular/router';
import { PatientModule } from './patients/patient.module';
import { MedicationModule } from './patients/medication/medication.module';
import { MedicationListComponent } from './patients/medication/medication-list.component';
import { EditModalComponent } from './shared/edit-modal/edit-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patients/patient-list/patient-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EditModalComponent
  ],
  
  entryComponents: [
    EditModalComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MedicationModule,
    BrowserAnimationsModule,
    MaterialModule,
    PatientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { 
        path: 'patients',
        loadChildren:() => import('./patients/patient.module').then(m => m.PatientModule)
      },
      { 
        path: 'medication',
        component: MedicationListComponent,
        loadChildren:() => import('./patients/medication/medication.module').then(m => m.MedicationModule)
      },
      { path: '', redirectTo: 'patients', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    NoopAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
