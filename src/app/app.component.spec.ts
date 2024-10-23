import { TestBed } from '@angular/core/testing';
import { appComponent } from './app.component'; // Update to import the correct component

describe('TemplatesComponent', () => { // Update the describe block name
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [appComponent], // Update to use the correct component
    }).compileComponents();
  });

  it('should create the component', () => { // Update test description
    const fixture = TestBed.createComponent(appComponent); // Update to use the correct component
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Template Management' title`, () => { // Update expected title
    const fixture = TestBed.createComponent(appComponent); // Update to use the correct component
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Template Management'); // Update expected title
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(appComponent); // Update to use the correct component
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Template Management'); // Update expected title
  });
});
