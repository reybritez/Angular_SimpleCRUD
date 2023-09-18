import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task!: Task;

  constructor(
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

  goBack(): void {
    this.location.back();
  }
}

