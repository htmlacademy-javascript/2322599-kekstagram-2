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

const MINUTES_IN_HOUR = 60;
function isMeetingAtWorkingHours(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes (time) {
    const [hours, minutes] =
    time.split(':').map(Number);
    return hours * MINUTES_IN_HOUR + minutes;
  }

  const WorkStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = timeToMinutes(meetingDuration);

  return meetingStartMinutes >= WorkStartMinutes && meetingEndMinutes <= workEndMinutes;
}
isMeetingAtWorkingHours('08:00', '17:30', '14:00', 90);
