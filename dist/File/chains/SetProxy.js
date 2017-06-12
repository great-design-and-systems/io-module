"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PROXY = process.env.PROXY;

var SetProxy = exports.SetProxy = function SetProxy(request) {
    if (PROXY) {
        request.proxy(PROXY);
    }
    return {
        getRequest: function getRequest() {
            return request;
        }
    };
};