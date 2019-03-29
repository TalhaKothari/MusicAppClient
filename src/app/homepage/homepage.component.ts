import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

	dataa: any;
	allArtists: any;
	weather: any;
	openBox: false;
	values: any;
	success: false;

  constructor(private http: HttpClient) {
  	this.getArtists();
  }	

  getArtists(){
  	
  	this.http.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a3fe8fa2085afbc2ef13f2b197c8192c").subscribe((data: any)=>{
  		console.log(data);
  		this.weather = data;
  	});

  	this.allArtists =  [{name: "Akon", album: "Alone"}, {name: "Brown", album: "Someone"}];

  	this.http.get("http://35.242.155.161/music).subscribe((data: any)=>{
  		this.allArtists=data;
  	});
  	
  	/*this.http.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a3fe8fa2085afbc2ef13f2b197c8192c").subscribe((data: any)=>{
  		console.log(data);
  		this.allArtists = data;
  	});*/

  }

  add(event){
  	this.openBox = !this.openBox;
  }

  onSubmit(form: NgForm){
	this.values = form.value;
  	this.http.post("http://35.242.155.161/music", this.values).subscribe((data: any)=>{
  		console.log(data);
  		this.values.id = data.id? data.id: 32;
  		this.allArtists.push(this.values);
  		this.openBox = false;
  		this.success = true;
  	});
  }

  edit(event, item){
  	console.log(item);
  	this.http.put("http://35.242.155.161/music"+item.id, {item: item}).subscribe((data: any)=>{
  		console.log(data);
  	});
  }

  delete(event, item){
  	if(item.id){
	  	this.http.delete("http://35.242.155.161/music"+item.id).subscribe((data: any)=>{
	  		console.log(data);
	  	});
	}
  }

  ngOnInit() {

  }

  

}
