function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('аа', 2);

function checkPalindrom(string) {
  const normalisedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalisedString.length - 1; i >= 0; i--){
    reversedString += normalisedString[i];
  }
  return normalisedString === reversedString;
}
checkPalindrom('Топо т');
