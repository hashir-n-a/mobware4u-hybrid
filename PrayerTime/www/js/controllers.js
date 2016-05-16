angular.module('starter.controllers', [])


.controller('PrayerTimesCtrl', function($scope, $localstorage) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData ) {
            calculatePrayerTimesForToday();
        })


        function calculatePrayerTimesForToday() {
            var date = new Date(); // today
            var latitude  = $localstorage.getLocLatitude();
            var longitude = $localstorage.getLocLongitude();
            var timezone = prayTime.getTimeZone(date);

            prayTime.setCalcMethod($localstorage.getCalculationMethod());
            prayTime.setAsrMethod($localstorage.getAsrMethod());
            prayTime.setTimeFormat($localstorage.getTimeFormat());


            var times = prayTime.getPrayerTimes(date, latitude, longitude, timezone);

            var prayerTimes = [];
            prayerTimes.push({'name':'Fajr',   'time': times[0]});
            prayerTimes.push({'name':'Sunrise','time': times[1]});
            prayerTimes.push({'name':'Dhuhr',  'time': times[2]});
            prayerTimes.push({'name':'Asr',    'time': times[3]});
            prayerTimes.push({'name':'Magrib', 'time': times[4]});
            prayerTimes.push({'name':'Sunset', 'time': times[5]});
            prayerTimes.push({'name':'Isha',   'time': times[6]});

            $scope.prayerTimes = prayerTimes;

// TEST TIME
//            date.setHours(15);
//            date.setMinutes(49);
//            date.setSeconds(10);
//            date.setMilliseconds(0);
// TEST TIME

            $scope.nextPrayerTime    = prayerTimes[getNextPrayerTimeIndex(times, date)];
            $scope.currentPrayerTime = prayerTimes[getCurrentPrayerTimeIndex(times, date)];

            $scope.remainingTime = getRemainingTime(date);
        }


        function getCurrentPrayerTimeIndex(times, currentDate) {
            var nextPrayerIndex = 0;
            for(var i=0; i<times.length; i++) {
                var prayerTimeDate = getDateFromTime(times[i]);
                // dont check sunrise and sunset times
                if(prayerTimeDate.getTime() < currentDate.getTime() && i != 1 && i != 5) {
                    nextPrayerIndex = i;
                }
            }
            return nextPrayerIndex;
        }


        function getNextPrayerTimeIndex(times, currentDate) {
            var nextPrayerIndex = 0;
            for(var i=0; i<times.length; i++) {
                var prayerTimeDate = getDateFromTime(times[i]);
                // dont check sunrise and sunset times
                if(prayerTimeDate.getTime() > currentDate.getTime() && i != 1 && i != 5) {
                    nextPrayerIndex = i;
                    break;
                }
            }
            return nextPrayerIndex;
        }

        function getDateFromTime(time) {
            var timeFormat = $localstorage.getTimeFormat();
            if(timeFormat == 0) {
                // 24 hour format
                return moment(time, ["HH:mm"]).toDate();
            } else {
                // 12 hour format
                return moment(time, ["h:mm A"]).toDate();
            }
        }

        function getRemainingTime(currentDate) {
            var date = getDateFromTime($scope.nextPrayerTime.time);
            // if its fajr then set for tomorrow
            if($scope.nextPrayerTime.name == 'Fajr') {
                date.setDate(date.getDate() + 1);
            }
            return moment(date).from(currentDate);
        }

})



.controller('SettingsCtrl', function($scope, $ionicActionSheet, $localstorage, $cordovaGeolocation) {

        var calculationMethods = [  { text: 'Ithna Ashari'},
                                    { text: 'University of Islamic Sciences, Karachi'},
                                    { text: 'Islamic Society of North America (ISNA)' },
                                    { text: 'Muslim World League (MWL)' },
                                    { text: 'Umm al-Qura, Makkah'},
                                    { text: 'Egyptian General Authority of Survey' },
                                    { text: 'Custom setting' },
                                    { text: 'Institute of Geophysics, University of Tehran'}
                                 ]


        var asrTypes           = [  {text: 'Shafii'},
                                    {text :'Hanafi'}
                                 ]


        var timeFormats        = [  {text: '24 hour'},
                                    {text :'12 hour'}
                                 ]


        if($localstorage.getIsAutomaticLocation()) {
            $scope.isLocationChecked = true;
        } else {
            $scope.isLocationChecked = false;
        }

        $scope.loc_latitude  = parseFloat($localstorage.getLocLatitude());
        $scope.loc_longitude = parseFloat($localstorage.getLocLongitude());
        $scope.calculationMethod = calculationMethods[$localstorage.getCalculationMethod()].text;
        $scope.asrMethod = asrTypes[$localstorage.getAsrMethod()].text;
        $scope.timeFormat = timeFormats[$localstorage.getTimeFormat()].text;

        displayPositionOnMap();

        $scope.saveManualLocation = function(latitude, longitude) {
            $localstorage.saveLocLatitude(latitude);
            $localstorage.saveLocLongitude(longitude);
            $scope.loc_latitude  = parseFloat($localstorage.getLocLatitude());
            $scope.loc_longitude = parseFloat($localstorage.getLocLongitude());
            displayPositionOnMap();
        }


        $scope.selectCalculationMethods = function() {


            $ionicActionSheet.show({
                buttons: calculationMethods,
                titleText: 'Calculation Methods',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    var calcMethodJSON = {};
                    calcMethodJSON['title']  = calculationMethods[index].text;
                    calcMethodJSON['method'] = index;
                    $localstorage.saveCalculationMethod(calcMethodJSON);
                    $scope.calculationMethod = calculationMethods[index].text;
                    return true;
                }
            });
        }


        $scope.selectAsrType = function() {

            $ionicActionSheet.show({
                buttons: asrTypes,
                titleText: 'Asr type',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    var asrMethodJSON = {};
                    asrMethodJSON['title']  = asrTypes[index].text;
                    asrMethodJSON['method'] = index;
                    $localstorage.saveAsrMethod(asrMethodJSON);
                    $scope.asrMethod = asrTypes[index].text;
                    return true;
                }
            });
        }



        $scope.selectTimeFormat = function() {

            $ionicActionSheet.show({
                buttons: timeFormats,
                titleText: 'Time formats',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    var timeFormatJSON = {};
                    timeFormatJSON['title']  = timeFormats[index].text;
                    timeFormatJSON['method'] = index;
                    $localstorage.saveTimeFormat(timeFormatJSON);
                    $scope.timeFormat = timeFormats[index].text;
                    return true;
                }
            });
        }



        $scope.isLocationCheckedOrNot = function(isLocationChecked) {
            if(isLocationChecked) {
                // automatic location
                getPosition();
            }
            $localstorage.saveIsAutomaticLocation(isLocationChecked);
        }




        /**
         * Get current location
         */
        function getPosition() {
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            }

            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
                savePosition(position);
            }, function(error) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    savePosition(position);
                };

                function onError(error) {
                    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
                }
            });
        }


        function savePosition(position) {
            $localstorage.saveLocLatitude(position.coords.latitude);
            $localstorage.saveLocLongitude(position.coords.longitude);

            $scope.loc_latitude  = parseFloat(position.coords.latitude);
            $scope.loc_longitude = parseFloat(position.coords.longitude);

            // display on map
            displayPositionOnMap();
        }


        function displayPositionOnMap() {
            var latLng = new google.maps.LatLng($scope.loc_latitude, $scope.loc_longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

            });
        }
});
