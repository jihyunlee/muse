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

var muse;
var oscSender;

function run() {

  window.requestAnimationFrame(function() {
    run();
  });
}

function getMean(str) {
  var array = str.split(',').filter(Boolean);
  var sum = 0;
  array.forEach(function(value, i) {
    sum += parseFloat(parseFloat(value).toFixed(2));
  });
  return parseFloat(sum / array.length).toFixed(2);
}

function sendOSC(data) {
  oscSender.send('/j', data, function() {
//    console.log('data', data)  
  }, function(e) {
    console.error(e)
  })
}

function registerData() {
  var dataType = ['horseshoe', 'concentration', 'mellow', 'alphaRelative', 'betaRelative', 'deltaRelative', 'thetaRelative', 'gammaRelative'];

  dataType.forEach(function(data) {
    var div = document.createElement('div');
    var name = document.createElement('span');
    name.innerHTML = '<br>' + data + ': ';
    div.appendChild(name);
    var value = document.createElement('span');
    value.setAttribute('id', data);
    value.innerHTML = '-';
    div.appendChild(value);
    document.body.appendChild(div);
  });

  muse.registerDataListener(
    dataType,
    function(data) {

      data.forEach(function(d) {
        if (d.hasOwnProperty("concentration")) {
          var concentration = parseFloat(d.concentration).toFixed(2);
          sendOSC('a'+concentration);
          document.getElementById('concentration').innerHTML = concentration;
        } else if (d.hasOwnProperty('mellow')) {
          var mellow = parseFloat(d.mellow).toFixed(2);
          sendOSC('m'+mellow);
          document.getElementById('mellow').innerHTML = mellow;
        } else if (d.hasOwnProperty('horseshoe')) {
          var pos = ["<br>left ear: ", "<br>left forehead: ", "<br>right forehead: ", "<br>right ear: "];
          var array = d.horseshoe.split(',').filter(Boolean);
          var text = '';
          array.forEach(function(v, i) {
            text += pos[i];
            text += parseFloat(v).toFixed(2);
          })

          document.getElementById('horseshoe').innerHTML = text;
        } else if (d.hasOwnProperty('alphaRelative')) {
          var alpha = getMean(d.alphaRelative);
          sendOSC('ha'+alpha);
          document.getElementById('alphaRelative').innerHTML = alpha;
        } else if (d.hasOwnProperty('betaRelative')) {
          var beta = getMean(d.betaRelative);
          sendOSC('hb'+beta);
          document.getElementById('betaRelative').innerHTML = beta;
        } else if (d.hasOwnProperty('deltaRelative')) {
          var delta = getMean(d.deltaRelative);
          sendOSC('d'+delta);
          document.getElementById('deltaRelative').innerHTML = delta;
        } else if (d.hasOwnProperty('thetaRelative')) {
          var theta = getMean(d.thetaRelative);
          sendOSC('t'+theta);
          document.getElementById('thetaRelative').innerHTML = theta;
        } else if (d.hasOwnProperty('gammaRelative')) {
          var gamma = getMean(d.gammaRelative);
          sendOSC('hg'+gamma);
          document.getElementById('gammaRelative').innerHTML = gamma;
        }
      });

    },
    function(err) {
      console.error('registerData', err);
    }
  );
}

function init(event) {

  if (typeof window.cordova != 'undefined') {
    if (window.cordova.logger) {
      window.cordova.logger.__onDeviceReady();
    }
  }

  if (typeof OSCSender != 'undefined') {
    oscSender = new OSCSender('192.168.1.255', 3000);
  }

  if (typeof Muse != 'undefined') {
    muse = new Muse();

    muse.init(
      function(res) {
//        console.log('init!');
        registerData();
      },
      function(err) {
        console.error('init', err);
      }
    );
  }
};

function isPhoneGap() {
  if (typeof cordova == 'undefined' && typeof PhoneGap == 'undefined' && typeof phonegap == 'undefined')
    return false;

  return ((cordova || PhoneGap || phonegap) && /^file:\/{3}[^\/]/i.test(window.location.href) && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)) ||
    window.tinyHippos; //this is to cover phonegap emulator
}

if (isPhoneGap()) {
  document.addEventListener('deviceready', init);
} else {
  window.addEventListener('load', init);
}