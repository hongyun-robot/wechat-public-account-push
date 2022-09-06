import {CITY_INFO} from './store/index.js'
import dayjs from "dayjs";
import axios from "axios";
// const {Solar, Lunar, HolidayUtil} = require('./lunar.js')
// console.log(CITY_INFO)
// console.log(Lunar.fromDate(new Date()))
// console.log(Solar.fromYmd(2016, 1, 1).toFullString())
//
// console.log(HolidayUtil.getHolidays(2022, 10))
// console.log(HolidayUtil.getHolidays(2022, 9)[0].getTarget().split('-').slice(1, 3).join('-'))

const getWeather = async (province, city, timestamp) => {
  if (!CITY_INFO[province] || !CITY_INFO[province][city] || !CITY_INFO[province][city]["AREAID"]) {
    console.error('配置文件中找不到相应的省份或城市')
    return null
  }
  const cityid = CITY_INFO[province][city]["AREAID"]

  // const url = `http://d1.weather.com.cn/dingzhi/${address}.html?_=${timestamp || dayjs().valueOf()}`
  // const url = `https://v0.yiketianqi.com/free/week?appid=34186143&appsecret=9wJ3Opnq${address}.html?_=${timestamp || dayjs().valueOf()}`
  const url = 'https://v0.yiketianqi.com/free/week';
  const appid = 34186143;
  const appsecret = '9wJ3Opnq';

  const res = await axios.get(url, {
    params: {
      appid,
      appsecret,
      cityid
    }
  }).catch(err => err)

  try {
    if (res.status === 200 && res.data) {
      try {
        return res.data.data[1]
      } catch (e) {
        throw new Error('获取天气信息失败')
      }
    } else {
      throw new Error(res)
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error('天气情况: 序列化错误', e)
    } else {
      console.error('天气情况: ', e)
    }
    return null
  }
}

getWeather('江苏', '南京', dayjs().hour(9).minute(0).second(0).millisecond(0).add(5, 'day').valueOf()).then(res => {
  console.log(res)
})
