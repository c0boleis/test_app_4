import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskLink, getTaskLinkIdentifier } from '../task-link.model';

export type EntityResponseType = HttpResponse<ITaskLink>;
export type EntityArrayResponseType = HttpResponse<ITaskLink[]>;

@Injectable({ providedIn: 'root' })
export class TaskLinkService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-links');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taskLink: ITaskLink): Observable<EntityResponseType> {
    return this.http.post<ITaskLink>(this.resourceUrl, taskLink, { observe: 'response' });
  }

  update(taskLink: ITaskLink): Observable<EntityResponseType> {
    return this.http.put<ITaskLink>(`${this.resourceUrl}/${getTaskLinkIdentifier(taskLink) as number}`, taskLink, { observe: 'response' });
  }

  partialUpdate(taskLink: ITaskLink): Observable<EntityResponseType> {
    return this.http.patch<ITaskLink>(`${this.resourceUrl}/${getTaskLinkIdentifier(taskLink) as number}`, taskLink, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskLink>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskLink[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTaskLinkToCollectionIfMissing(taskLinkCollection: ITaskLink[], ...taskLinksToCheck: (ITaskLink | null | undefined)[]): ITaskLink[] {
    const taskLinks: ITaskLink[] = taskLinksToCheck.filter(isPresent);
    if (taskLinks.length > 0) {
      const taskLinkCollectionIdentifiers = taskLinkCollection.map(taskLinkItem => getTaskLinkIdentifier(taskLinkItem)!);
      const taskLinksToAdd = taskLinks.filter(taskLinkItem => {
        const taskLinkIdentifier = getTaskLinkIdentifier(taskLinkItem);
        if (taskLinkIdentifier == null || taskLinkCollectionIdentifiers.includes(taskLinkIdentifier)) {
          return false;
        }
        taskLinkCollectionIdentifiers.push(taskLinkIdentifier);
        return true;
      });
      return [...taskLinksToAdd, ...taskLinkCollection];
    }
    return taskLinkCollection;
  }
}
