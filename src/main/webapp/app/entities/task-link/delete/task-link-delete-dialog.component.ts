import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskLink } from '../task-link.model';
import { TaskLinkService } from '../service/task-link.service';

@Component({
  templateUrl: './task-link-delete-dialog.component.html',
})
export class TaskLinkDeleteDialogComponent {
  taskLink?: ITaskLink;

  constructor(protected taskLinkService: TaskLinkService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskLinkService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
