import { Injectable, Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs/rx';

@Injectable()
export class FlickrLoadingAnimServiceService {

  private m_start: Subject<void>;
  private m_stop: Subject<void>;
  constructor() { 
    this.m_start = new Subject<void>();
    this.m_stop = new Subject<void>();
  }

  public  notiftStart(){
    return this.m_start.next();
  }

  public notifyStop(){
    return this.m_stop.next();
  }

  public get startSubscribe():Observable<void>{
    return this.m_start.asObservable();
  }

  public get stopSubscribe():Observable<void>{
    return this.m_stop.asObservable();
  }

}
