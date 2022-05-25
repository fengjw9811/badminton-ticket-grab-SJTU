// ==UserScript==
// @name         霍体羽毛球抢票
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       fengjw
// @match        https://sports.sjtu.edu.cn/pc/
// @icon         https://api.sjtu.edu.cn/v1/file/a2e0349d-4981-441e-98b5-769d15386a32
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function setSiteTime() {

        //此处更改场地时间区间，默认为20点到21点
        var time1 = 20
        var time2 = 21
        var seat = document.querySelectorAll('.inner-seat')
        var seatArr = new Array()

        //默认选择指定时间下的可选的第一个场地，可以自行指定场地
        for (let i = 15 * time1 - 105; i < 15 * time2 - 105; i++) {
            var ele = seat[i]
            seatArr.push(ele)
        }
        var unselectedSeatArr = seatArr.filter(item => item.className == 'inner-seat unselected-seat')
        unselectedSeatArr[0].click()
    }
    function getSeat() {
        setSiteTime()
        document.querySelector('.butMoney').querySelector('button').click()
        document.querySelector('.el-checkbox__label').click()
        document.querySelectorAll('.el-dialog__footer')[1].querySelectorAll('button')[1].click()
    }
    const grab = function () {
        var date = new Date()
        var nowSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
        //大于12点时开始抢票，每0.5s刷新一次
        if (nowSeconds >= 43170) {

            //此处可以更改抢票日期
            var targetDate = document.querySelector('#tab-2022-01-05')
            if (targetDate) {
                targetDate.click()
                setTimeout(getSeat, 700);
            }
            else {
                setTimeout(function () {
                    window.location.reload();
                }, 0);
            }
        }
        else {

            // 未到设定抢票时间，进入下一轮循环
            setTimeout(grab, 1000);
        }
    }
    grab()
})();