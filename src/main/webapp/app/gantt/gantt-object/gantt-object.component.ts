import { Component, Input } from '@angular/core';
import { Task } from '../../entities/task/task.model';
import * as dayjs from 'dayjs';

@Component({
  selector: 'jhi-gantt-object',
  templateUrl: './gantt-object.component.html',
  styleUrls: ['./gantt-object.component.scss'],
})
export class GanttObjectComponent {
  refDate: dayjs.Dayjs = dayjs('2021-10-14');

  @Input()
  task?: Task;

  getLeft(): number {
    const delta = this.task?.startTime?.subtract(this.refDate.date());
    if (delta) {
      const value: number = delta.date();
      return value * 10;
    }
    return 0;
  }

  getObjStyle(): any {
    const pxSuffix = 'px';
    const valueL: string = this.getLeft().toString();
    return { position: 'relative', left: valueL + pxSuffix };
  }
}
