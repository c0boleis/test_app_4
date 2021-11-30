import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskLink } from '../task-link.model';

@Component({
  selector: 'jhi-task-link-detail',
  templateUrl: './task-link-detail.component.html',
})
export class TaskLinkDetailComponent implements OnInit {
  taskLink: ITaskLink | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskLink }) => {
      this.taskLink = taskLink;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
