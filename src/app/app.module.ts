import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FlickrHeaderComponent } from './flickr-header/flickr-header.component';
import { FlickrLoadGraphicsComponent } from './flickr-load-graphics/flickr-load-graphics.component';
import { FlickrApiService } from './flickr-api.service';
import { FlickrImageViewerComponent } from './flickr-image-viewer/flickr-image-viewer.component';
import { Constants, Image } from './models';
import { FlickrImageThumbnailComponent } from './flickr-image-thumbnail/flickr-image-thumbnail.component';
import { FlickrPageComponent } from './flickr-page/flickr-page.component';
import { FlickrLoadingAnimServiceService } from './flickr-loading-anim-service.service';

@NgModule({
  declarations: [
    AppComponent,
    FlickrHeaderComponent,
    FlickrLoadGraphicsComponent,
    FlickrImageViewerComponent,
    FlickrImageThumbnailComponent,
    FlickrPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FlickrApiService, FlickrLoadingAnimServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
