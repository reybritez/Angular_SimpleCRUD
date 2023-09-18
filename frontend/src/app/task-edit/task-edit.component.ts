import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input()
  task!: Task;

  constructor (
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit() {
      this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.params['id'];
    this.taskService.getTask(id).subscribe((task) => (this.task = task));
  }

  save(): void {
    this.taskService.updateTask(this.task).subscribe((success) => {this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
