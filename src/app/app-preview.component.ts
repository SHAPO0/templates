// template-preview.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-template-preview',
  template: `
    <h1 mat-dialog-title>Preview: {{data.template.name}}</h1>
    <div mat-dialog-content>
      <div [innerHTML]="replacePlaceholders(data.template.content, previewModel)"></div>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class TemplatePreviewComponent {
  previewModel = {
    firstName: 'John',
    lastName: 'Doe',
    date: '2024-10-20',
    // ...other placeholder values
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  replacePlaceholders(content: string, model: any) {
    return content.replace(/\{\{(.*?)\}\}/g, (match, key) => model[key.trim()] || '');
  }
}
