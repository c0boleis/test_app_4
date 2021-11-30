import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskLink, TaskLink } from '../task-link.model';
import { TaskLinkService } from '../service/task-link.service';

@Injectable({ providedIn: 'root' })
export class TaskLinkRoutingResolveService implements Resolve<ITaskLink> {
  constructor(protected service: TaskLinkService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskLink> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((taskLink: HttpResponse<TaskLink>) => {
          if (taskLink.body) {
            return of(taskLink.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskLink());
  }
}
