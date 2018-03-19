import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { Constants, Image, ImageResponse } from '../models';
import { Subscription, Observable, Subject } from 'rxjs/rx';
import { FlickrImageThumbnailComponent } from '../flickr-image-thumbnail/flickr-image-thumbnail.component';
import { FlickrLoadingAnimServiceService } from '../flickr-loading-anim-service.service';

@Component({
  selector: 'app-flickr-image-viewer',
  templateUrl: './flickr-image-viewer.component.html',
  styleUrls: ['./flickr-image-viewer.component.css']
})
export class FlickrImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
  private m_imageResponse: Observable<ImageResponse>;
  private m_imageRespSub: Subscription;
  // private m_imagesLoadedEvent: EventEmitter<void>;
  private m_rowCount: number = 0;
  private m_totalPages: number;
  private m_currPage: number;
  private m_currImageCount: number;

  @ViewChildren('thumbnails')
  private m_thumbnails: QueryList<FlickrImageThumbnailComponent>;


  public readonly imagePerRow: number = 4;
  public readonly imagePerPage: number = 20;

  constructor(private m_flickrApiSrv: FlickrApiService, private loadingAnimSrv: FlickrLoadingAnimServiceService) {
  }

  ngOnInit() {
    this.setImageSubscription();
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
  }
  private setImageSubscription(page?: number) {
    this.images = this.m_flickrApiSrv.getImages(page);
    const sub = this.images.subscribe(val => {
      console.log(val.photo.length);
      this.m_totalPages = val.pages;
      this.m_currPage = val.page;
      this.m_currImageCount = val.photo.length;
      setTimeout(() => {
        sub.unsubscribe()
      });
    });
  }

  public imageLoaded() {
    this.m_currImageCount--;
    if (this.m_currImageCount === 0) {
      this.loadingAnimSrv.notifyStop();
    }
  }

  public get currentPage(): number {
    return this.m_currPage;
  }

  public set currentPage(page: number) {
    this.m_currPage = page;
  }

  public get totalImageCount():number{
    return this.m_totalPages;
  }
  
  public get isMultiPage(): boolean {
    return this.m_totalPages > 1;
  }

  public get rowCount(): number {
    return this.m_rowCount;
  }

  public setPage(page: number) {
    if (page > 0 && page <= this.m_totalPages) {
      this.loadingAnimSrv.notiftStart();
      this.currentPage = page;
      this.m_thumbnails.forEach(item => {
        item.dispose();
      });
      this.setImageSubscription(this.currentPage);
    }
  }

  public set images(img: Observable<ImageResponse>) {
    this.m_imageResponse = img;
  }
  public get images(): Observable<ImageResponse> {
    return this.m_imageResponse;
  }

  public get rowCounter(): Array<number> {
    return this.getCounter(Math.ceil(this.imagePerPage / this.imagePerRow));
  }

  public get perRowCounter(): Array<number> {
    return this.getCounter(this.imagePerRow);
  }
  public getCounter(size: number): Array<number> {
    return new Array<number>(size);
  }

}
