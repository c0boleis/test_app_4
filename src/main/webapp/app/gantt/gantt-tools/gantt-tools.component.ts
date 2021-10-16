import { Component, OnInit } from '@angular/core';
import { ITask } from 'app/entities/task/task.model';
import { HttpResponse } from '@angular/common/http';
import { TaskService } from '../../entities/task/service/task.service';

@Component({
  selector: 'jhi-gantt-tools',
  templateUrl: './gantt-tools.component.html',
  styleUrls: ['./gantt-tools.component.scss'],
})
export class GanttToolsComponent implements OnInit {
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
