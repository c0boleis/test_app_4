import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaskLinkDetailComponent } from './task-link-detail.component';

describe('Component Tests', () => {
  describe('TaskLink Management Detail Component', () => {
    let comp: TaskLinkDetailComponent;
    let fixture: ComponentFixture<TaskLinkDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TaskLinkDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ taskLink: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TaskLinkDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskLinkDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load taskLink on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.taskLink).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
