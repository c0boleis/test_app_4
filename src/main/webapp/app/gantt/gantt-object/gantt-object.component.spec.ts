import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttObjectComponent } from './gantt-object.component';

describe('GanttObjectComponent', () => {
  let component: GanttObjectComponent;
  let fixture: ComponentFixture<GanttObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttObjectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
