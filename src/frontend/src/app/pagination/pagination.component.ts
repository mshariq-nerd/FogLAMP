import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AssetsComponent } from '../assets/index';

@Component({
    selector: 'my-pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent  {
    @Input() page: number; // the current page
    @Input() count: number; // how many total items there are in all pages
    @Input() perPage: number; // how many items we want to show per page
    @Input() pagesToShow: number; // how many pages between next/prev

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();
    @Output() goFirst = new EventEmitter<boolean>();
    @Output() goLast = new EventEmitter<number>();

    middlePg : any;
    lastPg : any;

    constructor() {}

    ngOnInit() {
        this.middlePg = this.middlePage();
        this.lastPg = this.totalPages();
    }

    getMin(): number {
        return ((this.perPage * this.page) - this.perPage) + 1;
    }

    getMax(): number {
        let max = this.perPage * this.page;
        if (max > this.count) {
        max = this.count;
        }
        return max;
    }

    onPage(n: number): void {
        this.goPage.emit(n);
    }

    onPrev(): void {
        this.goPrev.emit(true);
    }

    onNext(): void {
        this.goNext.emit(true);
    }

    onFirst(): void {
        this.goFirst.emit(true);
    }

    onLast(): void {
        const n = this.totalPages();
        this.goLast.emit(n);
    }

    totalPages(): number {
        return Math.ceil(this.count / this.perPage) || 0;
    }

    lastPage(): boolean {
        return this.perPage * this.page >= this.count;
    }

    middlePage(): number {
        const n = this.totalPages();
        const p = Math.ceil(n/2);
        return p;
    }

    getPages(): number[] {
        const c = Math.ceil(this.count / this.perPage);
        const p = this.page || 1;
        const pagesToShow = this.pagesToShow || 9;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
        if (pages.length < pagesToShow) {
            if (Math.min.apply(null, pages) > 1) {
            pages.push(Math.min.apply(null, pages) - 1);
            }
        }
        if (pages.length < pagesToShow) {
            if (Math.max.apply(null, pages) < c) {
            pages.push(Math.max.apply(null, pages) + 1);
            }
        }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }
}
