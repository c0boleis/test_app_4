import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TaskLinkService } from '../service/task-link.service';

import { TaskLinkComponent } from './task-link.component';

describe('Component Tests', () => {
  describe('TaskLink Management Component', () => {
    let comp: TaskLinkComponent;
    let fixture: ComponentFixture<TaskLinkComponent>;
    let service: TaskLinkService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TaskLinkComponent],
      })
        .overrideTemplate(TaskLinkComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskLinkComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TaskLinkService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.taskLinks?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
