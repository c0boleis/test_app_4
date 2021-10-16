import { Component, Input } from '@angular/core';
import { Task } from 'app/entities/task/task.model';

@Component({
  selector: 'jhi-gantt-list-object',
  templateUrl: './gantt-list-object.component.html',
  styleUrls: ['./gantt-list-object.component.scss'],
})
export class GanttListObjectComponent {
  @Input()
  task?: Task;
}
