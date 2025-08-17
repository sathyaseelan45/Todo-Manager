import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Priority, Task, TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todoapi',
  standalone:true,
  imports: [FormsModule,CommonModule,DragDropModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

    title='';
  duedate='';
  priority: Priority='Medium';
  editingindex:number|null=null;
  editingtitle='';

  constructor(public todoservice:TodoService){}

  addtask(){
    const tasktitle=this.title.trim();
    if(tasktitle&&this.duedate){
      this.todoservice.addtask(tasktitle,this.duedate,this.priority);
      this.title='';
      this.duedate='';
      this.priority='Medium'
    }
  }

  startedit(task:Task){
      this.editingindex=task.id!;
      this.editingtitle=task.title;
  }

  saveedit(task:Task){
    if(!this.editingtitle.trim()) return;
    this.todoservice.updatetask(task.id!,{title:this.editingtitle});
    this.editingindex=null;
    }
   
  

  canceledit(){
    this.editingindex=null;
  }

  drop(event:CdkDragDrop<Task[]>){
     this.todoservice.reordertasks(event.previousIndex,event.currentIndex);
  }

}



