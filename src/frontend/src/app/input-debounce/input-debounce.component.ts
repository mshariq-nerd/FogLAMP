import {Component, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'input-debounce',
    template: '<input class="input" appNumberOnly [type]="type" min="0" [max]="max" [placeholder]="placeholder" name="limit" [(ngModel)]="inputValue">',
    styleUrls: ['./input-debounce.component.css']
})
export class InputDebounceComponent {
    @Input() placeholder: string;
    @Input() type: string;
    @Input() max: string;
    @Input() delay = 2000;
    @Output() value: EventEmitter<any> = new EventEmitter();

    public inputValue: string;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.value.emit(input));
    }
}
