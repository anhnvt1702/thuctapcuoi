export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export function getValueByKey(object, key) {
    if (object && object[key]) {
        return object[key];
    }
    return null;
}

export const ReloadType ={
    Tracking_Order: "TRO",
}