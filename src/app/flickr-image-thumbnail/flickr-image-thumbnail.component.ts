import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { Constants, Image, ImageResponse } from '../models';
import { Subscription, Observable } from 'rxjs/rx';

@Component({
  selector: 'app-flickr-image-thumbnail',
  templateUrl: './flickr-image-thumbnail.component.html',
  styleUrls: ['./flickr-image-thumbnail.component.css']
})
export class FlickrImageThumbnailComponent implements OnInit, AfterViewInit {

  private m_image: Image;
  private m_imgEl: ElementRef;
  private m_isLoadedEvt: EventEmitter<void>;

  constructor( private m_renderer: Renderer2) {
    this.m_isLoadedEvt = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.m_renderer.listen(this.m_imgEl.nativeElement, 'load', ()=>{
      this.m_isLoadedEvt.emit();
    });
  }

  @ViewChild('imgElement')
  public set imageEl(el: ElementRef) {
    this.m_imgEl = el;
  }

  @Input()
  public set image(image: Image) {
    this.m_image = image;
  }

  @Output()
  public get imageLoaded():EventEmitter<void>{
    return this.m_isLoadedEvt;
  }

  public dispose(): void {
    this.m_renderer.setAttribute(this.m_imgEl.nativeElement,'src', '');
    this.m_image = null;
  }

  public get image(): Image {
    return this.m_image;
  }

  public get imageUrl(): string {
    if (this.m_image) {
      return `https://farm${this.m_image.farm}.staticflickr.com/${this.m_image.server}/${this.m_image.id}_${this.m_image.secret}.jpg;`;
    }
    return '';
  }

}
