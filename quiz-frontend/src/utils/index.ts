/**
 * Luhn Algorithm
 * @param cardNumber
 * @returns
 */
export function checkLuhn(cardNumber: any) {
  let nDigits = cardNumber.length;

  let nSum = 0;
  let isSecond = false;
  for (let i = 0; i < nDigits; i++) {
    if (cardNumber[i] === " ") continue;
    let d: number = cardNumber[i].charCodeAt(0) - "0".charCodeAt(0);

    if (isSecond === true) d = d * 2;

    let tempStr: string = d.toString();
    nSum += tempStr[0].charCodeAt(0) - "0".charCodeAt(0);
    nSum += tempStr[1] ? tempStr[1].charCodeAt(0) - "0".charCodeAt(0) : 0;

    isSecond = !isSecond;
  }

  return nSum % 10 === 0;
}
