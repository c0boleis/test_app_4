import { Component, Input, ElementRef, Output, Attribute, OnInit } from '@angular/core';
import { Task } from '../../entities/task/task.model';
import * as dayjs from 'dayjs';

@Component({
  selector: 'jhi-gantt-object',
  templateUrl: './gantt-object.component.html',
  styleUrls: ['./gantt-object.component.scss'],
})
export class GanttObjectComponent implements OnInit {
  //mont 0-11
  //day 1-31
  refDate: dayjs.Dayjs = dayjs(new Date(2021, 9, 14));

  @Output()
  dragPosition = { x: 0, y: 0 };

  @Input()
  task?: Task;

  ngOnInit(): void {
    this.dragPosition = { x: this.getLeft(), y: 0 };
  }

  getLeft(): number {
    const delta = this.task?.startTime?.diff(this.refDate, 'day');
    if (delta) {
      return delta;
    }
    return 0;
  }
}
