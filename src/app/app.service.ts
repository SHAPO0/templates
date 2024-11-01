// template.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  templates = [
    { id: 1, name: 'Template 1', content: 'Hello {{firstName}} {{lastName}}!', jsonData: { key1: 'value1', key2: 'value2' } },
    { id: 2, name: 'Template 2', content: 'Today is {{date}}' },
    // Existing templates with or without JSON data
  ];

  getTemplates() {
    return [...this.templates];
  }

  addTemplate(newTemplate: any) {
    const newId = this.templates.length ? Math.max(...this.templates.map(t => t.id)) + 1 : 1;
    this.templates.push({ id: newId, ...newTemplate });
  }

  updateTemplate(updatedTemplate: any) {
    const index = this.templates.findIndex(t => t.id === updatedTemplate.id);
    if (index !== -1) {
      this.templates[index] = { ...updatedTemplate };
    }
  }

  deleteTemplate(id: number) {
    this.templates = this.templates.filter(t => t.id !== id);
  }
}
