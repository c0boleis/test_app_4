import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttToolsComponent } from './gantt-tools.component';

describe('GanttToolsComponent', () => {
  let component: GanttToolsComponent;
  let fixture: ComponentFixture<GanttToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttToolsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
