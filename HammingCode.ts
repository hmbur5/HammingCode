
// Script for Hamming encoding/decoding challenge


/**
 * Performs Hamming encoding on a string of 4-bit data (D1 D2 D3 D4), and
 * returns an encoded byte (P H1 H2 H3 D1 D2 D3 D4) where P is the sum parity 
 * bit and H is the three Hamming bits. 
 * @param {string} data a string of 4 elements that are 1s or 0s
 * @returns {string} a string of 8 elements representing the encoded byte
 */
function encode(data: string): string{

    // check input is in the right form, ie. length 4 and elements are 1 or 0
    if (data.length != 4 ||  !/^[01]*$/.test(data)){
        throw new Error("Data received: '"+data+"' is not in correct form");
    }

    // perform encoding
    var D1: number = Number(data.charAt(0));
    var D2: number = Number(data.charAt(1));
    var D3: number = Number(data.charAt(2));
    var D4: number = Number(data.charAt(3));
    var H1: number = (D1+D2+D4)%2;
    var H2: number = (D1+D3+D4)%2;
    var H3: number = (D2+D3+D4)%2;
    var P: number = (H1+H2+H3+D1+D2+D3+D4)%2;

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

    // check input is in the right form before proceeding
    if (encoded_data.length != 8 ||  !/^[01]*$/.test(encoded_data)){
        throw new Error("Encoded data received: '"+encoded_data+"' is not in correct form");
    }

    // for efficiency, start by checking the total parity bit to see if any bit
    // in the encoded data has been flipped. 
    var sum: number = 0;                               
    for (var i = 1; i < encoded_data.length; i++) {  
        sum += Number(encoded_data[i]);         
    }
    if (sum % 2 == Number(encoded_data[0])) {
        return encoded_data.substring(4,8)
    }

    // if the parity bit is incorrect, a bit has been flipped. So we use the
    // Hamming bits to identify and correct it. 

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




/**
 * Tests encode and decode functionality by creating random data, encoding it,
 * simulating transmission and decoding. An error is thrown if the original and
 * decoded data do not match. 
 */
function test_hamming(){
// create data from random bits
    var testData: string = String(Math.floor(Math.random() * 2))+
        String(Math.floor(Math.random() * 2))+
        String(Math.floor(Math.random() * 2))+
        String(Math.floor(Math.random() * 2))

    // encode data
    var testEncoded: string = encode(testData)

    // simulate transmission by occasionally flipping of one random bit
    if (Math.floor(Math.random() * 2)) {
        var bit: number = Math.floor(Math.random() * 8)
        testEncoded = testEncoded.substring(0,bit) + 
            String(1-Number(testEncoded.charAt(bit))) + 
            testEncoded.substring(bit+1,8)
    }

    // decode data
    var testDecoded: string = decode(testEncoded)

    // check if same as original data
    if (testDecoded != testData) {
        throw new Error("Decoding unsuccessful for original data " + testData + 
            " and transmitted data " + testEncoded);
    }
}

// Applying a large number of testing cases...
for (let i = 0; i < 100; i++) {
    test_hamming()
}
console.log("Test successful")
