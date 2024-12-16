function checkStringLength(string, maxLength) {
  string.length <= maxLength;
}

checkStringLength();

function checkPalindrom(string) {
  const normalisedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalisedString.length - 1; i >= 0; i--){
    reversedString += normalisedString[i];
  }
  return normalisedString === reversedString;
}
checkPalindrom();
