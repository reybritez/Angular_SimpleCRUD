import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: TaskListComponent },
  { path: 'detail/:id', component: TaskDetailComponent},
  { path: 'edit/:id', component: TaskEditComponent,},
  { path: 'add', component: TaskAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
