import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttMainComponent } from './gantt-main.component';

describe('GanttMainComponent', () => {
  let component: GanttMainComponent;
  let fixture: ComponentFixture<GanttMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
