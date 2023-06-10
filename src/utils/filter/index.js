export function formatDate(date, formatStr) {
    if (date === null) {
      return ''
    }
    date = new Date(date)
  
    let str = formatStr
    let Week = ['日', '一', '二', '三', '四', '五', '六']
  
    str = str.replace(/yyyy|YYYY/, date.getFullYear())
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100))
    str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1))
    str = str.replace(/M/g, date.getMonth() + 1)
    str = str.replace(/w|W/g, Week[date.getDay()])
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
    str = str.replace(/d|D/g, date.getDate())
    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
    str = str.replace(/h|H/g, date.getHours())
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
    str = str.replace(/m/g, date.getMinutes())
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
    str = str.replace(/s|S/g, date.getSeconds())
  
    return str
  }
  

  // 获取时间间隔
  export function formatDuration(a, b) {
  
    let start = new Date(a.replace(/-/g, "/")).getTime();
    let end = new Date(b.replace(/-/g, "/")).getTime();
  
    let diff = new Date(end - start);
  
  
    //计算出相差天数
    let days = Math.floor(diff / (24 * 3600 * 1000));
  
    //计算出小时数
  
    let leave1 = diff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)
  
    let str = "";
    if (days != 0) {
      str = str + days + "天"
    }
    if (hours != 0) {
      str = str + hours + "小时"
    }
    if (minutes != 0) {
      str = str + minutes + "分钟";
    }
    return str;
  
  }
  