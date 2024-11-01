import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateService } from './app.service'; 
import { TemplatePreviewComponent } from './app-preview.component'; 
import { TemplateFormComponent } from './app-form.component'; 
import { Template } from './app.model'; // import the Template 
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [MatTableModule, MatButtonModule], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css',
})
export class appComponent { 
  title: string = 'Template Management'; 
  templates: Template[] = []; 
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
        this.templateService.addTemplate(result); // save new template
        this.loadTemplates(); // reload templates 
      }
    });
  }

  previewTemplate(template: any) {
    this.dialog.open(TemplatePreviewComponent, {
      width: '600px',
      data: { template: template }
    });
  }


editTemplate(template: any) {
  const dialogRef = this.dialog.open(TemplateFormComponent, {
    width: '400px',
    data: template // edit
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      result.id = template.id; 
      this.templateService.updateTemplate(result); 
      this.loadTemplates(); 
    }
  });
}

  deleteTemplate(template: Template) {
    this.templateService.deleteTemplate(template.id);
    this.loadTemplates(); // deletion
  }
}
