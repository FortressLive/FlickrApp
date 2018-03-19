import { Component, OnInit,OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FlickrLoadingAnimServiceService } from '../flickr-loading-anim-service.service';
import { Subscription } from 'rxjs/rx';

@Component({
  selector: 'app-flickr-load-graphics',
  templateUrl: './flickr-load-graphics.component.html',
  styleUrls: ['./flickr-load-graphics.component.css']
})
export class FlickrLoadGraphicsComponent implements OnInit, OnDestroy {

  private m_subs: Array<Subscription>;

  @ViewChild('loadingAnim')
  private m_loadingEl: ElementRef;

  constructor(private animSrv: FlickrLoadingAnimServiceService, private m_renderer: Renderer2) {
    this.m_subs = new Array<Subscription>();
  }

  ngOnInit() {
    const sub1 = this.animSrv.startSubscribe.subscribe(() => {
      this.m_renderer.removeAttribute(this.m_loadingEl.nativeElement, 'hidden');
    });
    const sub2 = this.animSrv.stopSubscribe.subscribe(() => {
      this.m_renderer.setAttribute(this.m_loadingEl.nativeElement, 'hidden', 'hidden');
    });

    this.m_subs.push(sub1);
    this.m_subs.push(sub2);
  }

  ngOnDestroy() {
    this.m_subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
