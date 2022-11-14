"use strict";
var timing = window.performance.timing;
var startTime = timing.navigationStart || timing.fetchStart;
var data = {
    "t_unload:上个文档的卸载时间": timing.unloadEventEnd - timing.unloadEventStart,
    "t_redirect:重定向时间": timing.redirectEnd - timing.redirectStart,
    "t_dns:服务器连接时间": timing.domainLookupEnd - timing.domainLookupStart,
    "t_tcp:服务器连接时间": timing.connectEnd - timing.connectStart,
    "t_request": timing.responseEnd - timing.requestStart,
    "t_response：网页下载时间": timing.responseEnd - timing.responseStart,
    "t_dom:dom ready时间": timing.domContentLoadedEventStart - timing.domLoading,
    "t_domready:dom ready时间": timing.domContentLoadedEventStart - startTime,
    "t_load:onload时间": timing.loadEventStart - timing.domLoading,
    "t_onload:总onload时间": timing.loadEventStart - startTime,
    "t_white：白屏时间": timing.responseEnd - startTime,
    "t_all": timing.loadEventEnd - startTime //整个过程的时间之和
};
console.dir(data);
