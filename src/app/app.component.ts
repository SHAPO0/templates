import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateService } from './app.service'; // Service to handle CRUD
import { TemplatePreviewComponent } from './app-preview.component'; // Preview dialog
import { TemplateFormComponent } from './app-form.component'; // Form dialog
import { Template } from './app.model'; // Import the Template interface
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [MatTableModule, MatButtonModule], // Add required Material modules
  templateUrl: './app.component.html', // Ensure this points to the correct HTML file
})
export class appComponent { // Updated class name to match selector
  title: string = 'Template Management'; // Updated title property

  templates: Template[] = []; // Declare templates with the correct type
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private dialog: MatDialog, private templateService: TemplateService) {
    this.loadTemplates();
  }

  loadTemplates() {
    this.templates = this.templateService.getTemplates();
  }

  openCreateTemplateDialog() {
    const dialogRef = this.dialog.open(TemplateFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTemplates(); // Reload templates after creation
      }
    });
  }

  previewTemplate(template: Template) {
    this.dialog.open(TemplatePreviewComponent, {
      width: '600px',
      data: { template: template }
    });
  }

  editTemplate(template: Template) {
    const dialogRef = this.dialog.open(TemplateFormComponent, {
      width: '400px',
      data: template // Pass the template to the form for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTemplates(); // Reload templates after editing
      }
    });
  }

  deleteTemplate(template: Template) {
    this.templateService.deleteTemplate(template.id);
    this.loadTemplates(); // Reload after deletion
  }
}
