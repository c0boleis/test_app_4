import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaskLink, TaskLink } from '../task-link.model';

import { TaskLinkService } from './task-link.service';

describe('Service Tests', () => {
  describe('TaskLink Service', () => {
    let service: TaskLinkService;
    let httpMock: HttpTestingController;
    let elemDefault: ITaskLink;
    let expectedResult: ITaskLink | ITaskLink[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TaskLinkService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TaskLink', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TaskLink()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TaskLink', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TaskLink', () => {
        const patchObject = Object.assign({}, new TaskLink());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TaskLink', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TaskLink', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTaskLinkToCollectionIfMissing', () => {
        it('should add a TaskLink to an empty array', () => {
          const taskLink: ITaskLink = { id: 123 };
          expectedResult = service.addTaskLinkToCollectionIfMissing([], taskLink);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(taskLink);
        });

        it('should not add a TaskLink to an array that contains it', () => {
          const taskLink: ITaskLink = { id: 123 };
          const taskLinkCollection: ITaskLink[] = [
            {
              ...taskLink,
            },
            { id: 456 },
          ];
          expectedResult = service.addTaskLinkToCollectionIfMissing(taskLinkCollection, taskLink);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TaskLink to an array that doesn't contain it", () => {
          const taskLink: ITaskLink = { id: 123 };
          const taskLinkCollection: ITaskLink[] = [{ id: 456 }];
          expectedResult = service.addTaskLinkToCollectionIfMissing(taskLinkCollection, taskLink);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(taskLink);
        });

        it('should add only unique TaskLink to an array', () => {
          const taskLinkArray: ITaskLink[] = [{ id: 123 }, { id: 456 }, { id: 10287 }];
          const taskLinkCollection: ITaskLink[] = [{ id: 123 }];
          expectedResult = service.addTaskLinkToCollectionIfMissing(taskLinkCollection, ...taskLinkArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const taskLink: ITaskLink = { id: 123 };
          const taskLink2: ITaskLink = { id: 456 };
          expectedResult = service.addTaskLinkToCollectionIfMissing([], taskLink, taskLink2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(taskLink);
          expect(expectedResult).toContain(taskLink2);
        });

        it('should accept null and undefined values', () => {
          const taskLink: ITaskLink = { id: 123 };
          expectedResult = service.addTaskLinkToCollectionIfMissing([], null, taskLink, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(taskLink);
        });

        it('should return initial array if no TaskLink is added', () => {
          const taskLinkCollection: ITaskLink[] = [{ id: 123 }];
          expectedResult = service.addTaskLinkToCollectionIfMissing(taskLinkCollection, undefined, null);
          expect(expectedResult).toEqual(taskLinkCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
