import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttToolsComponent } from './gantt-tools/gantt-tools.component';
import { GanttMainComponent } from './gantt-main/gantt-main.component';
import { RouterModule } from '@angular/router';
import { ganttState } from './gantt.route';
import { GanttViewComponent } from './gantt-view/gantt-view.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ganttState)],
  declarations: [GanttToolsComponent, GanttMainComponent, GanttViewComponent],
})
export class GanttModule {}
