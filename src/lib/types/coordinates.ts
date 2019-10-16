

export interface LatLng {
    lat: number;
    lng: number;
}


export function isLatLngEqual(a: LatLng, b: LatLng){

    return a === b ||
        (isLatLng(a)
        && isLatLng(b)
        && a.lat === b.lat
        && a.lng === b.lng);

}

export function isLatLngArrayEqual(a: Array<LatLng>, b: Array<LatLng>){

    if(a === b) return true;

    if(Array.isArray(a) && Array.isArray(b) && a.length === b.length){
        for(let i = 0; i < a.length; i++){
            if(!isLatLngEqual(a[i], b[i])) return false;
        }
        return true;
    }

    return false;

}

export function isLatLng(obj: any): obj is LatLng {
    return obj !== undefined
            && obj !== null
            && typeof obj.lat === "number"
            && typeof obj.lng === "number";
}

export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}