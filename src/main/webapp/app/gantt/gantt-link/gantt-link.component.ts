import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TaskLinkService } from 'app/entities/task-link/service/task-link.service';
import { TaskLink } from 'app/entities/task-link/task-link.model';

@Component({
  selector: 'jhi-gantt-link',
  templateUrl: './gantt-link.component.html',
  styleUrls: ['./gantt-link.component.scss'],
})
export class GanttLinkComponent {
  @Input()
  taskLink?: TaskLink;

  constructor(private taskLinkService: TaskLinkService) {}
}
