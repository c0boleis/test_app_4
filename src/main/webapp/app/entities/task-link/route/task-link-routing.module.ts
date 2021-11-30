import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TaskLinkComponent } from '../list/task-link.component';
import { TaskLinkDetailComponent } from '../detail/task-link-detail.component';
import { TaskLinkUpdateComponent } from '../update/task-link-update.component';
import { TaskLinkRoutingResolveService } from './task-link-routing-resolve.service';

const taskLinkRoute: Routes = [
  {
    path: '',
    component: TaskLinkComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskLinkDetailComponent,
    resolve: {
      taskLink: TaskLinkRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskLinkUpdateComponent,
    resolve: {
      taskLink: TaskLinkRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskLinkUpdateComponent,
    resolve: {
      taskLink: TaskLinkRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(taskLinkRoute)],
  exports: [RouterModule],
})
export class TaskLinkRoutingModule {}
