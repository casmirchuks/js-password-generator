
//DOM elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const clipboardElement = document.getElementById('clipboard');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');


const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    symbol: getRandomSymbol,
    number: getRandomNumber
};

generate.addEventListener('click', () => {
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;
    
    resultElement.innerText = generatePassword( 
        hasLower, 
        hasUpper, 
        hasSymbol, 
        hasNumber, 
        length
        );
})

//copy password to clipboard 
clipboardElement.addEventListener('click', () => {

    const inputPw = document.createElement('inputPw')
    const password = resultElement.innerHTML;

    if (!password) {
        return;
    }

    inputPw.value = password
    document.body.appendChild(inputPw)
    inputPw.select();


    navigator.clipboard
    .writeText(inputPw)
    .then(() => {
        console.log(`${inputPw} was copied`);
        inputPw.remove();
    })
    .catch((err) => {
        console.error(`Error copying pw: ${err}`);
    })

})

//Generate password function
function generatePassword(lower, upper, number, symbol , length) {
    // 1. init password var
    // 2. Filter out unchecked types
    // 3. Loop over length call generator function for each type
    // 4. Add final password to the password variable and function 

    let generatedPassword = '';

    typesCount = lower + upper + number + symbol;

    console.log('typesCount: ', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
    );

    // console.log('typesArr: ', typesArr);

    if(typesCount === 0 ){
        return ''
    }

    for (let i = 0; i < length; i += typesCount) {

        typesArr.forEach(type => {

            const functionName = Object.keys(type)[0];

            generatedPassword += randomFunction[functionName]();
        })
    }

     console.log(generatedPassword.slice(0, length));

     const fpw = generatedPassword.slice(0, length);

     return fpw
}




//Generate functions


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol() {
    const symbol = "!@#$%^&*(){}:?<"
    return symbol[Math.floor(Math.random() * symbol.length)]
}
