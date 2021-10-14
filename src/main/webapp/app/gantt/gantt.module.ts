import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttToolsComponent } from './gantt-tools/gantt-tools.component';
import { GanttMainComponent } from './gantt-main/gantt-main.component';
import { RouterModule } from '@angular/router';
import { ganttState } from './gantt.route';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ganttState)],
  declarations: [GanttToolsComponent, GanttMainComponent],
})
export class GanttModule {}
