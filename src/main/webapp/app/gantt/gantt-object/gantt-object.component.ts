import { Component, Input } from '@angular/core';
import { Task } from '../../entities/task/task.model';
import * as dayjs from 'dayjs';

@Component({
  selector: 'jhi-gantt-object',
  templateUrl: './gantt-object.component.html',
  styleUrls: ['./gantt-object.component.scss'],
})
export class GanttObjectComponent {
  //mont 0-11
  //day 1-31
  refDate: dayjs.Dayjs = dayjs(new Date(2021, 9, 14));

  @Input()
  task?: Task;

  getLeft(): number {
    const delta = this.task?.startTime?.diff(this.refDate, 'day');
    if (delta) {
      return delta;
    }
    return 0;
  }

  getObjStyle(): any {
    const pxSuffix = 'px';
    const valueL: string = this.getLeft().toString();
    return { position: 'relative', left: valueL + pxSuffix };
  }
}
