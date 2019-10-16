import { LatLng } from './coordinates';

export class ZoomEvent {
    constructor(public zoom: number){}
}

export class PanEvent {
    constructor(public center: LatLng){}
}