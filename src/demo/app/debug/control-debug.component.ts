import { Component, Input } from "@angular/core";
import { FormControl } from '@angular/forms';





@Component({
    selector: 'app-control-debug',
    template: `<span *ngIf="control">
        <span [style.color]="control.dirty ? 'orange' : 'blue'">{{ control.dirty ? 'dirty' : 'pristine' }}</span>&nbsp;
        <span [style.color]="control.valid ? 'green' : 'red'">{{ control.valid ? 'valid' : 'invalid' }}</span>&nbsp;
        <span [style.color]="control.touched ? 'green' : 'blue'">{{ control.touched ? 'touch' : 'untouched' }}</span>&nbsp;
    </span>`
})
export class ControlDebugComponent {

    @Input()
    control: FormControl;

}