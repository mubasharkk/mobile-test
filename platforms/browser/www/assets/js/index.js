/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('#deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        var parentElement = $(id);
        $('.listening', parentElement).hide();
        $('.received', parentElement).show();

        this.boot();

        console.log('Received Event: ' + id);
    },
    // Boot app
    boot: function () {

        var $this = this;

        $.support.cors=true;

        var $client = new ApiClient({
            token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdiMDAzZDNiODc5YTBmYzVjYzUyOGMxMzI2YzgwMjhlMjU5YjVmMDUyMTUwNzkwN2ViYjhmMmE1ODcyMzMxMjIwNjBmZThmMDM0ZTRjYThmIn0.eyJhdWQiOiIxMSIsImp0aSI6IjdiMDAzZDNiODc5YTBmYzVjYzUyOGMxMzI2YzgwMjhlMjU5YjVmMDUyMTUwNzkwN2ViYjhmMmE1ODcyMzMxMjIwNjBmZThmMDM0ZTRjYThmIiwiaWF0IjoxNTAzNTAzNTYyLCJuYmYiOjE1MDM1MDM1NjIsImV4cCI6MTUzNTAzOTU2Miwic3ViIjoiMSIsInNjb3BlcyI6W119.BP4_qDi30Tzt6vRwIQa8HADX-6iqUJiZsCRnswsYm2Pi5_pagpZXuWL3QTgUcm7J-ux6YWlZ8iNHJM_6KA3VVlUsbOe-a7s6oODDRuCIYb3tPMmu-eMpXveqDhNvsNEjXiY5f_55kHb7qO9kAX9vjBvJl86HqojmKHY4Lk9RF9t05ZIVNmcek7tfIxtmJT1D0IowVlRRiHFN9DBDEG81OZdP9prHIv_BKwaYc1Kk97x6AZjLb0I4tPMnt8-c0hTUYKLfTzm4API6pevnk8QxmoVwkANMH6qaImK0spVpqLFJSAvHx-uLGQh1tkbWnEZhSYPrlnqHJCgf8hNKBNl9Loshe8_NoNn8o2EXEy7JBN7UQLdUzLCRLvHZXIa4HD6ECdskZg9ubp4zKYuo9aLVS6SyXQUFVCXlc4vtwpf0KiR4ugdJNlu9qDhkvcLt1HdgYYP73gahPpaQjZUvc7Fi1Mn5jBUJKbrxGNJDaYF65uWWvdZYh1wAxn26CIb3EO0SB3TUFxxISqEJgEh0JaImkReiyQD9VWdrDJ6mX9nWZRjiAkU5EMC-sYsFy3daFKLeoz6fUKEaYvq2R3BGvCurH1m2cINseQLGT2phuE8CEqqQ1nm0Ozjsf-5f4wsUFs3I6SRcw54YxF1RUATOxIoEPpX9nnw0xevWpDAc79bCcyE',
            code: 'zFIcfM'
        });

        $client.tours(function (response){
            $content = $this.view(response.data)
            $('#page-content').html($content);
            $content.listview();
        }, function(data){
            if (data.status == 0 && data.error != 'undefined') {
                alert(data.error);
            }
        });
    },


    view: function(data) {
        var $ul = $('<ul/>', {
            'data-role': 'listview',
            'data-theme': 'a',
            'id': 'tour-list'
        })

        $.each(data, function(index, values){
            $ul.append(
                $('<li/>', {'html' : values.loading.city + ' - ' + values.unloading.city})
            );
            $ul.append(
                $('<li/>', {'html' : values.title})
            );
        });

        return $ul;
    }
};
