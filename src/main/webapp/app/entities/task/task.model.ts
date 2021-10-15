import * as dayjs from 'dayjs';

export interface ITask {
  id?: number;
  taskName?: string | null;
  startTime?: dayjs.Dayjs | null;
  endTime?: dayjs.Dayjs | null;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public taskName?: string | null,
    public startTime?: dayjs.Dayjs | null,
    public endTime?: dayjs.Dayjs | null
  ) {}
}

export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}
