import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from './task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskUrl = 'http://localhost:8000'; // Search FLASK REST API

  constructor(private http: HttpClient) {}

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl + '/api/tasks');
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<any> {
    const url = `${this.taskUrl}/api/tasks/${id}`;
    return this.http.get<Task>(url);
  }

  /** POST: add a new task to the server */
  addTask(task: Task) {
    //console.log(task);
    return this.http.post(this.taskUrl + '/api/tasks/add', task, httpOptions);
  }

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.taskUrl + '/api/tasks/update', task, httpOptions);
  }

  /** DELETE: delete the task from the server */
  deleteTask(task: Task | number) {
    if (confirm('Are you sure to delete this Task?')) {
      const id = typeof task === 'number' ? task : task.task_id;
      const url = `${this.taskUrl}/api/tasks/delete/${id}`;
      return this.http.delete(url, httpOptions);
    }
    return of({});
  }
}
