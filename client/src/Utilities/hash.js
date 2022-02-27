// given a string, return its hash code
const stringHashCode = (str) => {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    let intPart = 1;
    const intPartInString = str.replace(/[^0-9]/g, "");
    if (intPartInString !== '') {
        intPart = parseInt(intPartInString);
    }
    return hash * (intPart === 0 ? 1 : intPart);
};

// returned hashed rgb val for string
function stringRGBHash(str) {
    const hashCode = stringHashCode(str);
    const r = (hashCode & 0xff0000) >> 16;
    const g = (hashCode & 0x00ff00) >> 8;
    const b = (hashCode & 0x0000ff);
    return `rgb(${r}, ${g}, ${b})`;
}

export default stringRGBHash;