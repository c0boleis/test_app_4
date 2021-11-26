import { Component, Input, ElementRef, Output, Attribute, OnInit } from '@angular/core';
import { ITask, Task } from '../../entities/task/task.model';
import * as dayjs from 'dayjs';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { TaskService } from 'app/entities/task/service/task.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'jhi-gantt-object',
  templateUrl: './gantt-object.component.html',
  styleUrls: ['./gantt-object.component.scss'],
})
export class GanttObjectComponent implements OnInit {
  // mont 0-11
  // day 1-31
  @Input()
  refDate: dayjs.Dayjs = dayjs(new Date(2021, 9, 14));

  isSaving = false;

  // @Input()
  freeDragPosition = { x: 200, y: 0 };

  @Input()
  task?: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.freeDragPosition = { x: this.getLeft(), y: 0 };
  }

  getLeft(): number {
    const delta = this.task?.startTime?.diff(this.refDate, 'day');
    if (delta) {
      return delta;
    }
    return 0;
  }

  updateStartTime(data: CdkDragEnd): void {
    if (this.task !== undefined) {
      this.freeDragPosition.x = this.freeDragPosition.x + data.distance.x;
      if (this.task.startTime !== undefined && this.task.startTime !== null) {
        console.warn('old date: ' + this.task.startTime.toString());
      }
      this.task.startTime = this.refDate.add(this.freeDragPosition.x, 'day');
      console.warn(`delta time: ${this.freeDragPosition.x}`);
      console.warn('new date: ' + this.task.startTime.toString());
      const taskTmp: Task = new Task();
      taskTmp.id = this.task.id;
      taskTmp.taskName = this.task.taskName;
      taskTmp.startTime = this.refDate.add(this.freeDragPosition.x, 'day');
      taskTmp.endTime = this.task.endTime;

      this.subscribeToSaveResponse(this.taskService.update(taskTmp));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected previousState(): void {
    window.history.back();
  }

  protected onSaveSuccess(): void {
    //TODO
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
