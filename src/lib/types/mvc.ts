import { LatLng } from './common';
import { WeightedLocation } from './heatmap';


export function updateMVCArray(litArray: Array<LatLng>, mvcArray: google.maps.MVCArray<any>){

    const mvcLength = mvcArray.getLength();

    litArray.forEach((lit, i) => {
        if(i >= litArray.length)
            mvcArray.insertAt(i, new google.maps.LatLng(lit));
        else
            mvcArray.setAt(i, new google.maps.LatLng(lit));
    });


    if(litArray.length > mvcLength){
        for(let i = litArray.length; i < mvcLength; i++){
            mvcArray.removeAt(i);
        }
    }

}

export function toMVCLatLngArray(litArray: Array<LatLng>): Array<google.maps.LatLng>{
    if(Array.isArray(litArray)){
        return litArray.map(lit => new google.maps.LatLng(lit));
    }
    return null;
}

export function toMVCLatLngOrWeightedArray(litArray: Array<WeightedLocation | LatLng>): google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation>{
    if(Array.isArray(litArray)){
        return new google.maps.MVCArray(litArray.map(lit => {

            if("location" in lit) return {
                location: new google.maps.LatLng(lit.location),
                weight: lit.weight
            };

            return new google.maps.LatLng(lit);
        }));
    }
    return null;
}

