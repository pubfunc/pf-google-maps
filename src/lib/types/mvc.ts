

export function updateMVCArray(litArray: Array<any>, mvcArray: google.maps.MVCArray<any>){

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


