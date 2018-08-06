import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs";
import 'rxjs-compat'

@Injectable()
export class TaskService {

  collection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;

  constructor(public afs:AngularFirestore) {
    // Access the collection tasks defined in Firebase
    console.log('Retrieving tasks...');
    this.collection = this.afs.collection('tasks');
    console.log("This is the collection: ", this.collection);
    this.tasks = this.collection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    console.log("These are the tasks: ", this.tasks);
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    console.log('Adding task...');
    this.afs.collection('tasks').add(task).then(function(docRef) {
      console.log("Task id is: ", docRef.id);
    });
  }

  deleteTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.delete().then(function() {
      console.log("Task successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });;
  }
  deleteTask2(task: Task) {
    console.log("Deleting task: ", task);
    this.taskDoc = this.collection.doc('${task.id}');
    this.taskDoc.delete().then(function() {
      console.log("Task successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
}
