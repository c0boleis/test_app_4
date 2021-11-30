import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TaskLinkComponent } from './list/task-link.component';
import { TaskLinkDetailComponent } from './detail/task-link-detail.component';
import { TaskLinkUpdateComponent } from './update/task-link-update.component';
import { TaskLinkDeleteDialogComponent } from './delete/task-link-delete-dialog.component';
import { TaskLinkRoutingModule } from './route/task-link-routing.module';

@NgModule({
  imports: [SharedModule, TaskLinkRoutingModule],
  declarations: [TaskLinkComponent, TaskLinkDetailComponent, TaskLinkUpdateComponent, TaskLinkDeleteDialogComponent],
  entryComponents: [TaskLinkDeleteDialogComponent],
})
export class TaskLinkModule {}
