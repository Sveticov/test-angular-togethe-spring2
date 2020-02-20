import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Anymodel} from "./Anymodel";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-spring';
  host='http://localhost:8080/app'
  tModel:Anymodel
  tModels:Anymodel[]

  constructor(private http:HttpClient) {
    this.tModel=new Anymodel()
    this.tModel.idModel=0
    this.tModel.nameModel='tModel 1'
    this.tModel.statusModel='EMPTY'
  }

  ngOnInit(): void {
    this.onAllmodels()
  }



  onPostmodel(anyModel:Anymodel):Observable<any>{
    return this.http.post(this.host+'/add',this.tModel)
  }
  onAllModel():Observable<any>{
    return this.http.get(this.host+'/all')
  }


  onAddModel() {
    this.tModel.idModel=this.tModel.idModel+1
    this.onPostmodel(this.tModel).subscribe(model=>this.tModels=model)
  }
  onAllmodels(){
    this.onAllModel().subscribe(m=>this.tModels=m)
  }
}
