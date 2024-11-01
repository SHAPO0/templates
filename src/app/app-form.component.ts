// template-form.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  template: `
    <h1 mat-dialog-title>{{data ? 'Edit Template' : 'Create Template'}}</h1>
    <div mat-dialog-content>
      <form [formGroup]="templateForm">
        <mat-form-field>
          <mat-label>Template Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Template Content</mat-label>
          <textarea matInput formControlName="content"></textarea>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Template JSON Data</mat-label>
          <textarea matInput formControlName="jsonData" placeholder='{"key": "value"}'></textarea>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </div>
  `,
})
export class TemplateFormComponent {
  templateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TemplateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Edit or create data
  ) {
    this.templateForm = this.fb.group({
      name: [data ? data.name : ''],
      content: [data ? data.content : ''],
      jsonData: [data ? JSON.stringify(data.jsonData, null, 2) : ''] // JSON as string input
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const formValue = this.templateForm.value;
    formValue.jsonData = formValue.jsonData ? JSON.parse(formValue.jsonData) : {}; // Parse JSON string
    this.dialogRef.close(formValue);
  }
}
