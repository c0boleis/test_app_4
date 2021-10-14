import { Route } from '@angular/router';

import { GanttToolsComponent } from './gantt-tools.component';

export const ganttToolsRoute: Route = {
  path: 'gantt-tools',
  component: GanttToolsComponent,
  data: {
    pageTitle: 'gantt-tools.title',
  },
};
