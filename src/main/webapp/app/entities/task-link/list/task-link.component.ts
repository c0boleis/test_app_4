import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskLink } from '../task-link.model';
import { TaskLinkService } from '../service/task-link.service';
import { TaskLinkDeleteDialogComponent } from '../delete/task-link-delete-dialog.component';

@Component({
  selector: 'jhi-task-link',
  templateUrl: './task-link.component.html',
})
export class TaskLinkComponent implements OnInit {
  taskLinks?: ITaskLink[];
  isLoading = false;

  constructor(protected taskLinkService: TaskLinkService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.taskLinkService.query().subscribe(
      (res: HttpResponse<ITaskLink[]>) => {
        this.isLoading = false;
        this.taskLinks = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITaskLink): number {
    return item.id!;
  }

  delete(taskLink: ITaskLink): void {
    const modalRef = this.modalService.open(TaskLinkDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.taskLink = taskLink;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
