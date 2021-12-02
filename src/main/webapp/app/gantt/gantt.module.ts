import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttToolsComponent } from './gantt-tools/gantt-tools.component';
import { GanttMainComponent } from './gantt-main/gantt-main.component';
import { RouterModule } from '@angular/router';
import { ganttState } from './gantt.route';
import { GanttViewComponent } from './gantt-view/gantt-view.component';
import { GanttObjectComponent } from './gantt-object/gantt-object.component';
import { GanttListObjectComponent } from './gantt-list-object/gantt-list-object.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GanttLinkComponent } from './gantt-link/gantt-link.component';

@NgModule({
  imports: [CommonModule, DragDropModule, RouterModule.forChild(ganttState)],
  declarations: [
    GanttToolsComponent,
    GanttMainComponent,
    GanttViewComponent,
    GanttObjectComponent,
    GanttListObjectComponent,
    GanttLinkComponent,
  ],
})
export class GanttModule {}
