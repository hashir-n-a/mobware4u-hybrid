angular.module('ionic.utils', [])


    .factory('$localstorage', ['$window', function($window) {

        var DEFAULT_CALCULATION_METHOD      = 3;
        var DEFAULT_ASR_METHOD              = 0;
        var DEFAULT_TIME_FORMAT             = 0;
        var DEFAULT_LOC_LAT                 = 9.9312328;
        var DEFAULT_LOC_LONG                = 76.2673040;
        var DEFAULT_IS_AUTOMATIC_LOC        = 'true';


        var set = function(key, value) {
            $window.localStorage[key] = value;
        };

        var get = function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        };

        var setObject = function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        };

        var getObject = function(key) {
            return JSON.parse($window.localStorage[key] || '[]');
        };

        return {
            saveCalculationMethod: function(calcMethodJSON) {
                setObject("prayertime-calculation-method", calcMethodJSON);
            },
            getCalculationMethod: function() {
                var calcMethod = getObject("prayertime-calculation-method");
                if(calcMethod != null && calcMethod.length != 0) {
                    return parseInt(calcMethod.method);
                }
                return DEFAULT_CALCULATION_METHOD;
            },
            saveAsrMethod: function(asrMethodJSON) {
                setObject('prayertime-asr-method', asrMethodJSON);
            },
            getAsrMethod: function() {
                var asrMethod = getObject("prayertime-asr-method");
                if(asrMethod != null && asrMethod != '') {
                    return parseInt(asrMethod.method);
                }
                return DEFAULT_ASR_METHOD;
            },
            saveTimeFormat : function(timeFormatJSON) {
                setObject('prayertime-time-format', timeFormatJSON);
            },
            getTimeFormat : function() {
                var timeFormat = getObject("prayertime-time-format");
                if(timeFormat != null && timeFormat != '') {
                    return parseInt(timeFormat.method);
                }
                return DEFAULT_TIME_FORMAT;
            },
            saveLocLatitude : function(location) {
                set('prayertime-loc-latitude', location);
            },
            getLocLatitude : function() {
                return get('prayertime-loc-latitude', DEFAULT_LOC_LAT);
            },
            saveLocLongitude : function(location) {
                set('prayertime-loc-longitude', location);
            },
            getLocLongitude : function() {
                return get('prayertime-loc-longitude', DEFAULT_LOC_LONG);
            },
            saveIsAutomaticLocation : function(isEnabled) {
                if(isEnabled)
                {
                   set('prayertime-automatic-location', 'true');
                }
                else
                {
                   set('prayertime-automatic-location', 'false');
                }

            },
            getIsAutomaticLocation : function() {
                var isEnabled = get('prayertime-automatic-location', DEFAULT_IS_AUTOMATIC_LOC);
                if(isEnabled == 'true') return true;
                return false;
            }
        }
    }]);