import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit{
  @Input() task: Task = {title: '', content: ''};

  constructor(private taskService: TaskService, private location: Location) {}

  ngOnInit() {}

  save() : void {
    this.taskService.addTask(this.task).subscribe(() => this.goBack());
  }

  goBack() : void {
    this.location.back();
  }
}
