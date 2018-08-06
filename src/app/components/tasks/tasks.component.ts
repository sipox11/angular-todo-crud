import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log("These are the retrieved tasks: ", tasks);
      this.tasks = tasks;
    })
  }

  deleteTask(event, task) {
    const response = confirm('Are you sure you want to delete it?');
      if(response) {
        if(event.type == "dblclick") {
          console.log("Received double click on task (about to be deleted): ", task)
          this.taskService.deleteTask(task);
        }
      }
  }

}
