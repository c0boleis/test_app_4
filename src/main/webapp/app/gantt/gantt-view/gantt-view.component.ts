import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from '../../entities/task/service/task.service';
import { HttpResponse } from '@angular/common/http';
import * as dayjs from 'dayjs';

@Component({
  selector: 'jhi-gantt-view',
  templateUrl: './gantt-view.component.html',
  styleUrls: ['./gantt-view.component.scss'],
})
export class GanttViewComponent implements OnInit {
  tasks?: ITask[];
  isLoading = false;
  startDate: dayjs.Dayjs = dayjs(new Date(2021, 9, 14));
  endDate: dayjs.Dayjs | undefined;
  /*
   * Use TaskService
   */
  constructor(private taskService: TaskService) {}

  loadAll(): void {
    this.isLoading = true;

    this.taskService.query().subscribe(
      (res: HttpResponse<ITask[]>) => {
        this.isLoading = false;
        this.tasks = res.body ?? [];
        this.updateDateLimit();
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  updateDateLimit(): void {
    if (this.tasks === undefined) {
      return;
    }
    if (this.tasks.length <= 0) {
      return;
    }
    /*
     * pre set start date
     */
    if (this.tasks[0].startTime !== undefined && this.tasks[0].startTime !== null) {
      this.startDate = this.tasks[0].startTime;
    } else {
      return;
    }
    /*
     * pre set end  date
     */
    if (this.tasks[0].endTime !== undefined && this.tasks[0].endTime !== null) {
      this.endDate = this.tasks[0].endTime;
    } else {
      return;
    }
    for (const task of this.tasks) {
      // Test minimum start date
      if (task.startTime !== undefined && task.startTime !== null) {
        if (this.startDate.date > task.startTime.date) {
          this.startDate = task.startTime;
        }
      }
      // Test maximum end date
      if (task.endTime !== undefined && task.endTime !== null) {
        if (this.endDate.date > task.endTime.date) {
          this.endDate = task.endTime;
        }
      }
    }
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITask): number {
    return item.id!;
  }
}
