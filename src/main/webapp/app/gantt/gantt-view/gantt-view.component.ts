import { Component, OnInit } from '@angular/core';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from '../../entities/task/service/task.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-gantt-view',
  templateUrl: './gantt-view.component.html',
  styleUrls: ['./gantt-view.component.scss'],
})
export class GanttViewComponent implements OnInit {
  tasks?: ITask[];
  isLoading = false;
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
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITask): number {
    return item.id!;
  }
}
