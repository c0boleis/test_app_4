import { Routes } from '@angular/router';

import { ganttMainRoute } from './gantt-main/gantt-main.route';

const GANTT_ROUTES = [ganttMainRoute];

export const ganttState: Routes = [
  {
    path: '',
    children: GANTT_ROUTES,
  },
];
