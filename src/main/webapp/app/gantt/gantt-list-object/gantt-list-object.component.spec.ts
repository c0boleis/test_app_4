import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttListObjectComponent } from './gantt-list-object.component';

describe('GanttListObjectComponent', () => {
  let component: GanttListObjectComponent;
  let fixture: ComponentFixture<GanttListObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttListObjectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttListObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
