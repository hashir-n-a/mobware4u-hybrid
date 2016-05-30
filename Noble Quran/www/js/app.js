// Ionic Starter App

angular.module('starter', ['ionic','starter.controllers', 'starter.suralist', 'starter.quran', 'ionic.utils', 'bookmark.controller' , 'settings.options'])


    .run(function($ionicPlatform, $localstorage, $rootScope, $state) {

        // not a very good idea. should change later on
        // load the settings before the view is rendered
        // load it only once when app starts
        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            $localstorage;
            if($rootScope.areOptionsLoaded == undefined)
            {
                loadTheme();
                loadArabicFonts();
                loadArabicFontSize();
                loadTranslationFontSize();
                loadIsWordByWordEnabled();
                loadIsTranslationEnabled();
                loadTranslation();
                checkIfTizenPlatform();
                $rootScope.areOptionsLoaded = true;
            }


            if(next.name != 'tab.sura-display')
            {
                $rootScope.hideTabs = '';
            }
            else
            {
                $rootScope.hideTabs = 'tabs-item-hide';
            }
        })


        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        })


        // Back button handling
        $ionicPlatform.registerBackButtonAction(function (event) {
            if($state.current.name=="tab.suras"){
                navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100)


        // tizen OS : back key handling
        window.addEventListener( 'tizenhwkey', function( ev ) {
            if( ev.keyName === "back" ) {
                try {
                    if($state.current.name=="tab.suras"){
                        tizen.application.getCurrentApplication().exit();
                    }
                    else {
                        window.history.back();
                    }
                } catch (ignore) {
                }
            }
        })

        var checkIfTizenPlatform = function() {
            $rootScope.isTizenPlatform = false;
            try {
                tizen.application;
                $rootScope.isTizenPlatform = true;
            } catch (ignore) {}
        }


        var loadIsTranslationEnabled = function() {
            $rootScope.isTranslationChecked = $localstorage.getOptionTranslationEnabled();
        }

        var loadTranslation = function() {
            $rootScope.translation = $localstorage.getOptionTranslation();
        }

        var loadIsWordByWordEnabled = function() {
            $rootScope.isWordbyWordChecked = $localstorage.getOptionWordByWordEnabled();
        }

        var loadTheme = function() {
            $rootScope.apptheme = $localstorage.getOptionTheme();
        }

        var loadArabicFonts = function() {
            $rootScope.arabicFont = $localstorage.getOptionArabicFont();
        }

        var loadArabicFontSize = function() {
            $rootScope.arabicFontSize = $localstorage.getOptionArabicFontSize();
        }

        var loadTranslationFontSize = function() {
            $rootScope.translationFontSize = $localstorage.getOptionTranslationFontSize();
        }


    })


    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })


            .state('tab.suras', {
                url: '/suras',
                views: {
                    'tab-suras': {
                        templateUrl: 'templates/tab-suras.html',
                        controller: 'SurasCtrl'
                    }
                }
            })

            .state('tab.bookmarks', {
                url: '/bookmarks',
                views: {
                    'tab-bookmarks': {
                        templateUrl: 'templates/tab-bookmarks.html',
                        controller: 'BookmarksCtrl'
                    }
                }
            })

            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/tab-settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('tab.sura-display', {
                url: '/suras/:suraIndex',
                views: {
                    'tab-suras': {
                        templateUrl: 'templates/sura-display.html',
                        controller: 'SuraDisplayCtrl'
                    }
                },
                params:{'suraIndex':null, 'ayaIndex' : null}
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/suras');

    })



    .directive('hideTabs', function($rootScope) {
        return {
            restrict: 'A',
            link: function($scope, $el) {
                $rootScope.hideTabs = 'tabs-item-hide';
                $scope.$on('$destroy', function() {
                    $rootScope.hideTabs = '';
                });
            }
        };
    });