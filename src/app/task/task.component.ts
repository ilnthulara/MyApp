import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Customer } from '../customer/customer.component';

//1.Create an interface for a single object
export interface Task {
  id: string;
  name: string;
  description: string;
  complete: boolean;
  photo: string;
  customer: Customer;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  //a.create from controls for each input
  name = new FormControl();
  description = new FormControl();
  customer = new FormControl();

  //2.create an array instance/variable for all objects
  tasks: Task[] = [];
  customers: Customer[] = [];

  //3.http oblect injection
  //b.http oblect injection
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAll();
  }

  //4.Load data from url and assign to array insatnce
  loadAll() {
    var url = "http://localhost:8080/tasks";
    this.http.get<Task[]>(url)
      .subscribe(data => {
        this.tasks = data;
      });

    var url = "http://localhost:8080/customers";
    this.http.get<Customer[]>(url)
      .subscribe(data => {
        this.customers = data;
      });
  }

  save() {
    //c.collect form data
    let body = new HttpParams({
      fromObject: {
        'name': this.name.value,
        'description': this.description.value,
        'customer': this.customer.value
      }
    });

    //d. passing to the url
    var url = "http://localhost:8080/task";
    this.http.post<any>(url, body)
      .subscribe(data => {
        this.loadAll();
        alert("Saved!!!");
      });
  }

  complete(task: { complete: boolean; customer: { id: any; }; }) {
    task.complete = true;
    task.customer = task.customer.id;
    let body = new HttpParams({
      fromObject: {
        'name': this.name.value,
        'description': this.description.value,
        'customer': this.customer.value
      }
    });

    var url = "http://localhost:8080/task";
    this.http.post<any>(url, body)
      .subscribe(data => {
        this.loadAll();
        alert("Updated!!!");
      });
  }

}
