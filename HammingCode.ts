
// Script for Hamming encoding/decoding challenge


/**
 * Performs Hamming encoding on a string of 4-bit data (D1 D2 D3 D4), and
 * returns an encoded byte (P H1 H2 H3 D1 D2 D3 D4) where P is the sum parity 
 * bit and H is the three Hamming bits. 
 * @param {string} data a string of 4 elements that are 1s or 0s
 * @returns {string} a string of 8 elements representing the encoded byte
 */
function encode(data: string): string{
    var D1: number = Number(data.charAt(0));
    var D2: number = Number(data.charAt(1));
    var D3: number = Number(data.charAt(2));
    var D4: number = Number(data.charAt(3));
    var P: number = (D1+D2+D3+D4)%2;
    var H1: number = (D1+D2+D4)%2;
    var H2: number = (D1+D3+D4)%2;
    var H3: number = (D2+D3+D4)%2;
    return String(P) + String(H1) + String(H2) + String(H3) + data;
}

// Testing
var myData: string = "1010";
var myEncodedData: string = encode(myData);
console.log(myEncodedData)
