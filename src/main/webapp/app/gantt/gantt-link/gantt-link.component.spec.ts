import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttLinkComponent } from './gantt-link.component';

describe('GanttLinkComponent', () => {
  let component: GanttLinkComponent;
  let fixture: ComponentFixture<GanttLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
