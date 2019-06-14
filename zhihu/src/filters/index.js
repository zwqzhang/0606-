export default {
    timefilter(str) {
        var year = str.slice(0, 4);
        var month = str.slice(4, 6);
        var day = str.slice(6);
        var arr = ["日", "一", "二", "三", "四", "五", "六"];
        var p = `${year}-${month}-${day}`;
        var m = new Date(Date.parse(p));
        var week = m.getDay();
        return month + "月" + day + "日" +'   '+ "星期" + arr[week];
    },
    commenttime(str) {
        var x = new Date(str);
        var month =
            x.getMonth() + 1 < 10 ? "0" + (x.getMonth() + 1) : x.getMonth() + 1;
        var day = x.getDate() < 10 ? "0" + x.getDate() : x.getDate();
        var hours = x.getHours() < 10 ? '0' + x.getHours() : x.getHours();
        var minutes = x.getMinutes() < 10 ? '0' + x.getMinutes() : x.getMinutes();
        return month + '-' + day + '  ' + hours + ':' + minutes;
    }
}