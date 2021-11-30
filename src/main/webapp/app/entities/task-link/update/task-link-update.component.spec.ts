jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TaskLinkService } from '../service/task-link.service';
import { ITaskLink, TaskLink } from '../task-link.model';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';

import { TaskLinkUpdateComponent } from './task-link-update.component';

describe('Component Tests', () => {
  describe('TaskLink Management Update Component', () => {
    let comp: TaskLinkUpdateComponent;
    let fixture: ComponentFixture<TaskLinkUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let taskLinkService: TaskLinkService;
    let taskService: TaskService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TaskLinkUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TaskLinkUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskLinkUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      taskLinkService = TestBed.inject(TaskLinkService);
      taskService = TestBed.inject(TaskService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Task query and add missing value', () => {
        const taskLink: ITaskLink = { id: 456 };
        const startTask: ITask = { id: 38088 };
        taskLink.startTask = startTask;
        const endTask: ITask = { id: 12168 };
        taskLink.endTask = endTask;

        const taskCollection: ITask[] = [{ id: 15671 }];
        jest.spyOn(taskService, 'query').mockReturnValue(of(new HttpResponse({ body: taskCollection })));
        const additionalTasks = [startTask, endTask];
        const expectedCollection: ITask[] = [...additionalTasks, ...taskCollection];
        jest.spyOn(taskService, 'addTaskToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ taskLink });
        comp.ngOnInit();

        expect(taskService.query).toHaveBeenCalled();
        expect(taskService.addTaskToCollectionIfMissing).toHaveBeenCalledWith(taskCollection, ...additionalTasks);
        expect(comp.tasksSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const taskLink: ITaskLink = { id: 456 };
        const startTask: ITask = { id: 97370 };
        taskLink.startTask = startTask;
        const endTask: ITask = { id: 92916 };
        taskLink.endTask = endTask;

        activatedRoute.data = of({ taskLink });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(taskLink));
        expect(comp.tasksSharedCollection).toContain(startTask);
        expect(comp.tasksSharedCollection).toContain(endTask);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TaskLink>>();
        const taskLink = { id: 123 };
        jest.spyOn(taskLinkService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ taskLink });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: taskLink }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(taskLinkService.update).toHaveBeenCalledWith(taskLink);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TaskLink>>();
        const taskLink = new TaskLink();
        jest.spyOn(taskLinkService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ taskLink });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: taskLink }));
        saveSubject.complete();

        // THEN
        expect(taskLinkService.create).toHaveBeenCalledWith(taskLink);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TaskLink>>();
        const taskLink = { id: 123 };
        jest.spyOn(taskLinkService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ taskLink });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(taskLinkService.update).toHaveBeenCalledWith(taskLink);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTaskById', () => {
        it('Should return tracked Task primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTaskById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
