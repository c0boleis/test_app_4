import { Route } from '@angular/router';

import { GanttMainComponent } from './gantt-main.component';

export const ganttMainRoute: Route = {
  path: 'home',
  component: GanttMainComponent,
  data: {
    pageTitle: 'gantt-main.title',
  },
};
