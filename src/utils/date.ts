export function formatDatetime(time: any, chinese = false) {
  if (time == null || time === '') return time;
  time = new Date(time);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const seconds =
    time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();

  if (chinese)
    return `${year}年 ${month}月 ${day}日 ${hours}时 ${minutes}分 ${seconds}秒`;
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function convertToYearAndMonth(time: any, chinese = false) {
  if (time == null || time === '') return time;
  time = new Date(time);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;

  if (chinese) return `${year}年 ${month}月`;
  return `${year}-${month}`;
}

export function formatDate(time: any, chinese = false) {
  if (time == null || time === '') return time;
  time = new Date(time);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  if (chinese) {
    let result = `${year}年`;
    if (month < 10) result += '\u00A0\u00A0';
    result = `${result + month}月`;
    if (day < 10) result += '\u00A0\u00A0';
    result = `${result + day}日`;
    return result;
  }

  let result = `${year}-`;
  if (month < 10) result += '0';
  result += `${month}-`;
  if (day < 10) result += '0';
  result += `${day}`;
  return result;
}

export function getFormatYearAndMonth(time: any, chinese = false) {
  if (time == null || time === '') return time;
  time = new Date(time);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;

  if (chinese) {
    let result = `${year}年`;
    if (month < 10) result += '\u00A0\u00A0';
    result = `${result + month}月`;
    return result;
  }

  let result = `${year}-`;
  if (month < 10) result += '0';
  result += `${month}`;
  return result;
}

export function diffDay(day1: string, day2: string) {
  // 假设 date1 和 date2 是两个日期对象
  const date1 = new Date(day1);
  const date2 = new Date(day2);

  // 将日期转换为毫秒时间戳
  const timestamp1 = date1.getTime();
  const timestamp2 = date2.getTime();

  // 计算时间差值（毫秒）
  const timeDiff = timestamp2 - timestamp1;

  // 将毫秒转换为天数
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}
