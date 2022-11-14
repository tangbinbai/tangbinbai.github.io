let timing=window.performance.timing;
var startTime = timing.navigationStart || timing.fetchStart;
var data = {
    "t_unload:上个文档的卸载时间": timing.unloadEventEnd - timing.unloadEventStart, //上个文档的卸载时间
    "t_redirect:重定向时间": timing.redirectEnd - timing.redirectStart, //*重定向时间
    "t_dns:服务器连接时间": timing.domainLookupEnd - timing.domainLookupStart, //*DNS查询时间
    "t_tcp:服务器连接时间": timing.connectEnd - timing.connectStart, //*服务器连接时间
    "t_request": timing.responseEnd - timing.requestStart, //*服务器响应时间
    "t_response：网页下载时间": timing.responseEnd - timing.responseStart, //*网页下载时间
    "t_dom:dom ready时间": timing.domContentLoadedEventStart - timing.domLoading, //dom ready时间（阶段）
    "t_domready:dom ready时间": timing.domContentLoadedEventStart - startTime, //*dom ready时间（总和）
    "t_load:onload时间": timing.loadEventStart - timing.domLoading, //onload时间（阶段）
    "t_onload:总onload时间": timing.loadEventStart - startTime, //*onload时间（总和）
    "t_white：白屏时间": timing.responseEnd - startTime, //*白屏时间
    "t_all": timing.loadEventEnd - startTime //整个过程的时间之和
};
console.dir(data)