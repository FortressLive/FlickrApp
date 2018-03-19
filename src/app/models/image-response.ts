import { Image } from './';
import { stat } from 'fs';

export class ImageResponse {

    public constructor(private m_page: number,
        private m_pages: number,
        private m_perpage: number,
        private m_total: string,
        private m_stat: string,
        private m_photos?: Array<Image>
    ) {


    }
    public get page(): number {
        return this.m_page;
    }
    public get pages(): number {
        return this.m_pages;
    }

    public get perpage(): number {
        return this.m_perpage;
    }
    public get total(): string {
        return this.m_total;
    }
    public get stat(): string {
        return this.m_stat;
    }
    public set page(page: number) {
        this.m_page = page;
    }
    public set pages(pages: number) {
        this.m_pages = pages;
    }
    public set perpage(perPage: number) {
        this.m_perpage = perPage;
    }
    public set total(total: string) {
        this.m_total = total;
    }
    public set photo(photos: Array<Image>) {
        this.m_photos = photos;
    }
    public set stat(stat: string){
        this.m_stat = stat;
    }

    public toString(): string {
        let str = '';
        str += `${this.m_page} + ${this.m_pages} + ${this.m_perpage} + ${this.m_total}`;
        if (this.m_photos) {
            this.m_photos.forEach(val => {
                str += val.toString();
            })
        }
        return str;
    }

}