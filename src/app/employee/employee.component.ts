import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

//1.Create an interface for a single object
export interface Employee {
  id: string;
  name: string;
  address: string;
  mobile: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  //a.create from controls for each input
  name = new FormControl();
  address = new FormControl();
  mobile = new FormControl();

  //2.create an array instance/variable for all objects
  employees: Employee[] = [];

  //3.http oblect injection
  //b.http oblect injection
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAll();
  }
  //4.Load data from url and assign to array insatnce
  loadAll() {
    var url = "http://localhost:8080/employees";
    this.http.get<Employee[]>(url)
      .subscribe(data => {
        this.employees = data;
      });
  }
  save() {
    //c.collect form data
    let body = new HttpParams({
      fromObject: {
        'name': this.name.value,
        'address': this.address.value,
        'mobile': this.mobile.value
      }
    });

    //d. passing to the url
    var url = "http://localhost:8080/employee";
    this.http.post<any>(url,body)
    .subscribe(data =>{
      this.loadAll();
      alert("Saved!!!");
    });
  }
}
