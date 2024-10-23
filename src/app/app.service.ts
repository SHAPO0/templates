// template.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  templates = [
    { id: 1, name: 'Template 1', content: 'Hello {{firstName}} {{lastName}}!' },
    { id: 2, name: 'Template 2', content: 'Today is {{date}}' },
    // ...other templates
  ];

  getTemplates() {
    return this.templates;
  }

  deleteTemplate(id: number) {
    this.templates = this.templates.filter(t => t.id !== id);
  }

  // Add methods for saving new templates or editing them...
}
