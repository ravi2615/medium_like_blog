import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';

const matrial = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatRadioModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [matrial],
  exports: [matrial],
})
export class MaterialModule {}
