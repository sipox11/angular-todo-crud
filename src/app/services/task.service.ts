import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';

@Injectable()
export class TaskService {
  tasks;

  constructor(public afs:AngularFirestore) {
    // Access the collection tasks defined in Firebase
    this.tasks = this.afs.collection('tasks').valueChanges();
  }

  getTasks() {
    return this.tasks;
  }
}
