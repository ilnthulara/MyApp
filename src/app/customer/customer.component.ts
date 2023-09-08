import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

//1.Create an interface for a single object
export interface Customer {
  id: string;
  name: string;
  address: string;
  mobile: string;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  //a.create from controls for each input
  name = new FormControl();
  address = new FormControl();
  mobile = new FormControl();

  //2.create an array instance/variable for all objects
  customers: Customer[] = [];

  //3.http oblect injection
  //b.http oblect injection
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAll();
  }
  //4.Load data from url and assign to array insatnce
  loadAll() {
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
        'address': this.address.value,
        'mobile': this.mobile.value
      }
    });

    //d. passing to the url
    var url = "http://localhost:8080/customer";
    this.http.post<any>(url,body)
    .subscribe(data =>{
      this.loadAll();
      alert("Saved!!!");
    });
  }

}
