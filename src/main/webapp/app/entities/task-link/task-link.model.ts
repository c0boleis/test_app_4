import { ITask } from 'app/entities/task/task.model';

export interface ITaskLink {
  id?: number;
  startTask?: ITask | null;
  endTask?: ITask | null;
}

export class TaskLink implements ITaskLink {
  constructor(public id?: number, public startTask?: ITask | null, public endTask?: ITask | null) {}
}

export function getTaskLinkIdentifier(taskLink: ITaskLink): number | undefined {
  return taskLink.id;
}
