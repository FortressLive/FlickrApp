import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { Constants, Image, ImageResponse } from '../models';
import { Subscription, Observable, Subject } from 'rxjs/rx';
import { FlickrImageThumbnailComponent } from '../flickr-image-thumbnail/flickr-image-thumbnail.component';
import { FlickrImageViewerComponent } from '../flickr-image-viewer/flickr-image-viewer.component';

@Component({
  selector: 'app-flickr-page',
  templateUrl: './flickr-page.component.html',
  styleUrls: ['./flickr-page.component.css']
})

export class FlickrPageComponent implements OnInit {

  private m_pressedKey;
  private m_currPage: number;
  private m_changePageEvnt: EventEmitter<number>;
  public EventType = PageEventType;

  constructor() {
    this.m_changePageEvnt = new EventEmitter<number>();
  }

  @ViewChild('pageInput')
  private m_pgInput: ElementRef;


  public onKey(evt: any) {
    this.m_pressedKey = evt.target.value;
    if (evt.keyCode == 13) { //Enter
      this.pageChanged(PageEventType.Custom);
    }
  }

  public pageChanged(evtType: PageEventType) {
    switch (evtType) {
      case PageEventType.Custom:
        const pageNum = this.m_pgInput.nativeElement.value;
        this.m_currPage = pageNum;
        this.m_changePageEvnt.next(parseInt(pageNum));
        break;
      case PageEventType.Back:
        if (this.m_currPage > 0) {
          this.m_currPage--;
          this.m_changePageEvnt.next(this.m_currPage);
        }
        break;
      case PageEventType.Forth:
        this.m_currPage++;
        this.m_changePageEvnt.next(this.m_currPage);
        break;
    }
  }

  @Input()
  public set currentPage(page: number) {
    this.m_currPage = page;
    this.m_pgInput.nativeElement.value = page;
  }

  @Output()
  public get changePageEvt(): EventEmitter<number> {
    return this.m_changePageEvnt;
  }

  ngOnInit() {
  }

}

export enum PageEventType {
  Custom,
  Back,
  Forth
}
