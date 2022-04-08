
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





/**
 * Performs Hamming decoding on a string of 8-bit data to return the original 
 * 4-bit data, correcting any errors that may results from a single bit being 
 * flipped during transmission. 
 * @param {string} encoded_data a string of 8 elements that are 1s or 0s, 
 * representing the transmitted byte which may contain an error in one bit
 * @returns {string} a string of 4 elements representing the original data
 */
function decode(encoded_data: string): string{

    // recalculate Hamming bits
    var D1: number = Number(encoded_data.charAt(4));
    var D2: number = Number(encoded_data.charAt(5));
    var D3: number = Number(encoded_data.charAt(6));
    var D4: number = Number(encoded_data.charAt(7));
    var H1: number = (D1+D2+D4)%2;
    var H2: number = (D1+D3+D4)%2;
    var H3: number = (D2+D3+D4)%2;

    // compare to input
    var H1check: boolean = H1==Number(encoded_data.charAt(1))
    var H2check: boolean = H2==Number(encoded_data.charAt(2))
    var H3check: boolean = H3==Number(encoded_data.charAt(3))

    //iterate through possibilities of checks being false, swap appropriate 
    // bit if required, and return original data. 

    // if all wrong, swap bit at D4
    if ((H1check || H2check || H3check) == false) {
        return String(D1) + String(D2) + String(D3) + String(1-D4);
    }

    // if only H1 and H2 are wrong, swap bit at D1
    else if ((H1check || H2check) == false) {
        return String(1-D1) + String(D2) + String(D3) + String(D4);
    }

    // if only H1 and H3 are wrong, swap bit at D2
    else if ((H1check || H3check) == false) {
        return String(D1) + String(1-D2) + String(D3) + String(D4);
    }

    // if only H2 and H3 are wrong, swap bit at D3
    else if ((H2check || H3check) == false) {
        return String(D1) + String(D2) + String(1-D3) + String(D4);
    }

    // any other possibility means any error would be in a redundant bit, so 
    //return data as is
    else {
        return String(D1) + String(D2) + String(D3) + String(D4);
    }
}
