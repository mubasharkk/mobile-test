class ApiClient {

    constructor(data) {
        this.endpoint = "http://apidev2.vislog.net/api/v2/";
        this.token = data.token;
        this.code = data.code;
    }

    apiUri(uri) {
        return this.endpoint + uri;
    }

    tours(successCallback, errorCallback) {
        this.sendRequest('tours/', 'GET', {code: this.code}, successCallback, errorCallback);
    }

    sendRequest(url, method, params = {}, successCallback = function () {}, errorCallback = function () {}) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, this.apiUri(url) + this.prepareQueryParams(params), true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.token)
        xhr.onreadystatechange = function () {
            var responseData = xhr.responseText ? JSON.parse(xhr.responseText) : {status: 0};
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && responseData.status) {
                successCallback(responseData);
            }else if(responseData.error) {
                errorCallback(responseData);
            }
        };
        xhr.send();
    }

    prepareQueryParams(params) {
        return "?" + Object
            .keys(params)
            .map(function (key) {
                return key + "=" + encodeURIComponent(params[key])
            })
            .join("&")
    }
}