import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  exports: [
    FormsModule, 
    MatDialogModule,
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    MatSelectModule
  ]
})

export class MaterialModule {}