import { Injectable, Inject } from '@angular/core';
import { Constants, Image, ImageResponse } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, Subject } from 'rxjs/Rx';


@Injectable()
export class FlickrApiService {
  private m_page: string;
  constructor(@Inject(HttpClient) private m_http: HttpClient) {
    this.m_page = '1';
  }

  public getImages(pg?: number): Observable<ImageResponse> {
    if(pg){
      this.m_page = pg + '';
    }
    const obsr = Observable.create((obsrv: Observer<ImageResponse>) => {
      const httpSub = this.m_http.get(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${Constants.APP_KEY}&user_id=${Constants.USER_ID}&format=json&nojsoncallback=1&per_page=20&page=${this.page}`)
        .map((response: any) => {
          return response.photos;
        })
        .subscribe((photos: ImageResponse) => {
          obsrv.next(photos);
          setTimeout(() => { httpSub.unsubscribe() });
        });
    }
    );
    return obsr;
  }

  public get page(): string {
    return this.m_page;
  }

  public set page(page: string) {
    this.m_page = page;
  }
}