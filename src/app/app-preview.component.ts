// template-preview.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule], // Add CommonModule here
  template: `
    <h1 mat-dialog-title>Preview: {{data.template.name}}</h1>
    <div mat-dialog-content>
      <!-- Render main content with placeholders replaced -->
      <div [innerHTML]="replacePlaceholders(data.template.content, previewModel)"></div>

      <!-- Render JSON frame if JSON data exists -->
      <div *ngIf="formattedJsonData" class="json-frame">
        <h3>JSON Data:</h3>
        <pre>{{ formattedJsonData }}</pre>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Close</button>
    </div>
  `,
  styles: [`
    .json-frame {
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
      background-color: #f9f9f9;
    }
    .json-frame pre {
      margin: 0;
      font-size: 0.9em;
    }
  `]
})
export class TemplatePreviewComponent {
  previewModel = {
    firstName: 'John',
    lastName: 'Doe',
    date: '2024-10-20',
    // ...other placeholder values
  };

  formattedJsonData: string;

  constructor(
    private dialogRef: MatDialogRef<TemplatePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Format JSON data if it exists in the template
    this.formattedJsonData = data.template.jsonData ? JSON.stringify(data.template.jsonData, null, 2) : '';
  }

  replacePlaceholders(content: string, model: any) {
    return content.replace(/\{\{(.*?)\}\}/g, (match, key) => model[key.trim()] || '');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
