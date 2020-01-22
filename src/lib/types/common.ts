

export interface LatLng {
    lat: number;
    lng: number;
}

export interface Size {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
}

export interface Point {
    x: number;
    y: number;
}

export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}
