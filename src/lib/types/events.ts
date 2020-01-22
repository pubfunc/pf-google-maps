import { LatLng } from './common';

export class ZoomEvent {
    constructor(public zoom: number){}
}

export class PanEvent {
    constructor(public center: LatLng){}
}