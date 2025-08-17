import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';


export type Priority='High'|'Medium'|'Low';

export interface Task{
  id?:number;
  title:string;
  done:boolean;
  duedate:string;
  priority:Priority;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly apiurl='http://localhost:3000/tasks';

    private tasks=signal<Task[]>([]);
  private filter=signal<'All'|'Active'|'Completed'>('All');

  gettasks=this.tasks.asReadonly();
  getfilter=this.filter.asReadonly();

  constructor(private http:HttpClient) {
    const stored=localStorage.getItem('Todo_tasks');
    if(stored)
    {
      this.tasks.set(JSON.parse(stored));
    }

    effect(()=>
    {
      const current=this.tasks();
      localStorage.setItem('Todo_tasks',JSON.stringify(current));
    })
   }
   
   setfilter(value:'All'|'Active'|'Completed')
   {
    this.filter.set(value);
   }

   get filtertasks(){
    return computed(()=>{
      const f=this.filter();
      const all=this.tasks();
      if(f=='Active')return all.filter((t)=>!t.done);
      if(f=='Completed')return all.filter((t)=>t.done);
      return all;
    })
   }

   fetchtasks(){
    this.http.get<Task[]>(this.apiurl).subscribe((res)=>
    {this.tasks.set(res)})
   }

  addtask(title:string,duedate:string,priority:Priority){
    const newtask:Task={title,done:false,duedate,priority};
    this.http.post<Task>(this.apiurl,newtask).subscribe((created)=>{
    this.tasks.update((list)=>[...list,created]);
    })
   
  }

  toggledone(task:Task){
    const updated={...task,done:!task.done};
    this.http.put<Task>(`${this.apiurl}/${task.id}`,updated).subscribe((res)=>{
    this.tasks.update((list)=>
      list.map((t)=>(t.id===res.id?res:t)));
    })
    }
  deletetask(id:number){
    this.http.delete<Task>(`${this.apiurl}/${id}`).subscribe(()=>{
    this.tasks.update((list)=>list.filter((t)=>t.id!==id));
    })

  }

  updatetask(id:number,updatedfields:Partial<Task>){
    const task=this.tasks().find((t)=>t.id===id)
    if(!task) return;
    const updated={...task,...updatedfields};
     this.http.put<Task>(`${this.apiurl}/${task.id}`,updated).subscribe((res)=>{
    this.tasks.update((list)=>
      list.map((t)=>(t.id===res.id?res:t)));
    })
    }
  
  
   reordertasks(prev: number, curr: number) {
    this.tasks.update((list) => {
      const updated = [...list];
      const [moved] = updated.splice(prev, 1);
      updated.splice(curr, 0, moved);
      return updated;
    });
  }
  clearall(){
      const current = this.tasks();
     current.forEach(task => {
    this.http.delete(`${this.apiurl}/${task.id}`).subscribe();
  });
    this.tasks.set([]);
  }
}




