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
  editState: boolean = false;
  taskToEdit: Task;

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log("These are the retrieved tasks: ", tasks);
      this.tasks = tasks;
    })
  }

  editTask(event, task) {
    console.log("Showing edit form...");
    this.editState = !this.editState;
    this.taskToEdit = task;
  }

  deleteTask(event, task) {
    const response = confirm('Are you sure you want to delete it?');
      if(response) {
        console.log("Received double click on task (about to be deleted): ", task)
          this.taskService.deleteTask(task);
      } else if (event.type == "click") {
          console.log("Received single click on task (about to be deleted): ", task)
          this.taskService.deleteTask(task);
      } else {
          console.log("Ignoring event...");
      }
      
  }

  updateTask(task) {
    console.log("Updating task... ", task);
    if(this.editState) {
      this.taskService.updateTask(this.taskToEdit);
    }
    return false;
  }
}
