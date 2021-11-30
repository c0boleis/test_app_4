import * as dayjs from 'dayjs';
import { ITaskLink } from 'app/entities/task-link/task-link.model';

export interface ITask {
  id?: number;
  taskName?: string | null;
  startTime?: dayjs.Dayjs | null;
  endTime?: dayjs.Dayjs | null;
  outLinks?: ITaskLink[] | null;
  inLinks?: ITaskLink[] | null;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public taskName?: string | null,
    public startTime?: dayjs.Dayjs | null,
    public endTime?: dayjs.Dayjs | null,
    public outLinks?: ITaskLink[] | null,
    public inLinks?: ITaskLink[] | null
  ) {}
}

export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}
