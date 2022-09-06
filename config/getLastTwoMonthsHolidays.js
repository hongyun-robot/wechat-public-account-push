import {HolidayUtil} from 'lunar-javascript'

const getHoliday = (holidayArr, key = 'getName') => {
  return holidayArr.length > 0 ? holidayArr[0][key]() : false;
}

const date = new Date();
const year = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const nextMonth = currentMonth >= 12 ? 1 : currentMonth + 1;
const nextYear = nextMonth < currentMonth ? year + 1 : year;

const nextHolidayName = getHoliday(HolidayUtil.getHolidays(nextYear, nextMonth))
const currentHolidayTarget = getHoliday(HolidayUtil.getHolidays(year, currentMonth), 'getTarget')

const festivalsArr = []
if (+date < +new Date(currentHolidayTarget)) {
  festivalsArr.push({
    type: '节日',
    name: getHoliday(HolidayUtil.getHolidays(year, currentMonth)),
    year,
    date: currentHolidayTarget.split('-').slice(1, 3).join('-')
  })
}

if (nextHolidayName) {
  festivalsArr.push({
    type: '节日',
    name: nextHolidayName,
    year: nextYear,
    date: getHoliday(HolidayUtil.getHolidays(nextYear, nextMonth), 'getTarget').split('-').slice(1, 3).join('-')
  })
}

export default festivalsArr
