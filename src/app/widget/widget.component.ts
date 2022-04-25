import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';   
import { environment } from 'src/environments/environment';
import { Servizio01Service } from '../servizio01.service';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, OnDestroy {

  Data : any;
  subscription:Subscription;
  apiEndpoint=environment.apiEndpoint
  
  constructor(private serv01 : Servizio01Service) { }
  

  ngOnInit(): void {
    this.Data= {main : {}}
    this.getData()
  }
  getData(){
    let observable=this.serv01.httpGet(this.apiEndpoint)
    this.subscription=observable.subscribe( httpResponse => { console.log(httpResponse); this.setData(httpResponse) })
  }

  setData(data : any) {
    this.Data = data;
    let giorno = this.Data[0].data
    this.Data.giorno = giorno
    let prev = this.Data[0].previsione
    this.Data.previsione = prev
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe() 
      console.log("oggetto WeatherWidgetMainComponent distrutto  ")
    }
  }

}
