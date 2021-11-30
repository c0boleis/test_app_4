import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITaskLink, TaskLink } from '../task-link.model';
import { TaskLinkService } from '../service/task-link.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';

@Component({
  selector: 'jhi-task-link-update',
  templateUrl: './task-link-update.component.html',
})
export class TaskLinkUpdateComponent implements OnInit {
  isSaving = false;

  tasksSharedCollection: ITask[] = [];

  editForm = this.fb.group({
    id: [],
    startTask: [],
    endTask: [],
  });

  constructor(
    protected taskLinkService: TaskLinkService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskLink }) => {
      this.updateForm(taskLink);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taskLink = this.createFromForm();
    if (taskLink.id !== undefined) {
      this.subscribeToSaveResponse(this.taskLinkService.update(taskLink));
    } else {
      this.subscribeToSaveResponse(this.taskLinkService.create(taskLink));
    }
  }

  trackTaskById(index: number, item: ITask): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskLink>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(taskLink: ITaskLink): void {
    this.editForm.patchValue({
      id: taskLink.id,
      startTask: taskLink.startTask,
      endTask: taskLink.endTask,
    });

    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing(
      this.tasksSharedCollection,
      taskLink.startTask,
      taskLink.endTask
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(
        map((tasks: ITask[]) =>
          this.taskService.addTaskToCollectionIfMissing(tasks, this.editForm.get('startTask')!.value, this.editForm.get('endTask')!.value)
        )
      )
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));
  }

  protected createFromForm(): ITaskLink {
    return {
      ...new TaskLink(),
      id: this.editForm.get(['id'])!.value,
      startTask: this.editForm.get(['startTask'])!.value,
      endTask: this.editForm.get(['endTask'])!.value,
    };
  }
}
