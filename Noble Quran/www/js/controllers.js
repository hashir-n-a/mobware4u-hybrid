angular.module('starter.controllers', [])



/**
 * Controller that handles the index of suras
  */
.controller('SurasCtrl', function($scope, Suras, Quran)
{
    $scope.suras = Suras.all();
})








/**
 * Controller that handles the sura display
 * The controller works in two modes
 * mode 1 : from surah index
 * mode 2 : from bookmarks
 */
.controller('SuraDisplayCtrl', function($scope, $rootScope, $http, $ionicActionSheet,
                                        $localstorage, $stateParams, $ionicScrollDelegate,
                                        $ionicPosition, $timeout, $window, $ionicHistory, $sce, Suras)
 {
     var numberOfAyasInAPage           = 10;
     var currentSuraDetails            = [];
     var currentSurahArray             = [];
     var currentSurahTranslationArray  = [];
     var currentPageStartAya           = 0;


     var SPECIAL_SHARE_MENU_ENABLE = false;



     // disable back animations
     $ionicHistory.nextViewOptions({
         disableAnimate: true,
         disableBack: true
     });







     /**
      * Display action sheet options that can be performed on the aya
      * @param suraIndex - which sura
      * @param ayaIndex - which aya
      */
     $scope.showOptions = function(suraIndex, ayaIndex) {

         var bookmarkJSON = {};
         var today = moment().format('D MMM, YYYY');
         var suraName = Suras.get(suraIndex);

         bookmarkJSON['sura'] = suraIndex;
         bookmarkJSON['aya']  = ayaIndex;
         bookmarkJSON['time'] = today;
         bookmarkJSON['suraName'] = suraName.tname;

         var buttonsArray = [{ text: 'Bookmark this aya' },
                             { text: 'Add to collections' },
                             { text: 'Share via email' }
                            ];

         // only if special share is enabled
         if(SPECIAL_SHARE_MENU_ENABLE) {
             buttonsArray.push({text: 'Special Share'});
         }

         $ionicActionSheet.show({

             buttons: buttonsArray,
             titleText: 'OPTIONS',
             cancelText: 'Cancel',
             cancel: function() {
                 // add cancel code..
             },
             buttonClicked: function(index) {
                 if(index == 0) {
                     // bookmark
                     bookmarkAya();
                 } else if(index == 1) {
                     // add to collections
                     addAyaToCollections();
                 } else if(index == 2) {
                     // share via email
                     shareViaEmail();
                 } else if(index == 3) {
                     specialShare();
                 }
                 return true;
             }
         });

         function bookmarkAya() {
             $localstorage.saveBookmark(bookmarkJSON);
         }

         function addAyaToCollections() {
             var ayaCollections = $localstorage.getAyaCollections();
             ayaCollections.push(bookmarkJSON);
             $localstorage.saveToAyaCollections(ayaCollections);
         }

         function shareViaEmail() {
             if(!$rootScope.isTranslationChecked)
             {
                 // translation  is not enabled
                 // so fetch translation before email
                 var translationFile = $localstorage.getOptionTranslation();
                 $http.get('data/' + translationFile).success(function (data) {
                     var translationDB = data[suraName.index-1];
                     composeAndSendEmail(translationDB[ayaIndex-1]);
                 });
             }
             else
             {
                 var currentPageStartAyaIndex = currentPageStartAyaFromBookmarkAyaIndex(ayaIndex);
                 var translationIndex = ayaIndex - currentPageStartAyaIndex - 1; // index starts at 0
                 // translation DB is already ready
                 composeAndSendEmail($scope.translationDB[translationIndex]);
             }
         }


         function composeAndSendEmail(aya) {
             var subject = suraName.tname + " : " + ayaIndex;
             var message = subject  + "%0D%0A%0D%0A" + aya;
             $scope.sendMail("", subject, message);
         }


         function specialShare() {
             var translationFile = 'en.yusufali';
             var malTranslationFile = 'ml.abdulhameed';
             var quranFile = 'quran_ar.json';

             $scope.isSuraLoading = true;

             $http.get('data/' + translationFile).success(function (data) {
                 var translationDB = data[suraName.index-1];

                 $http.get('data/' + malTranslationFile).success(function (data) {
                     var malTranslationDB = data[suraName.index-1];

                     $http.get('data/' + quranFile).success(function (data) {
                         var quranDB = data[suraName.index-1];

                         var message = "";
                         message = message + quranDB[ayaIndex-1] + "%0D%0A%0D%0A";
                         message = message + translationDB[ayaIndex-1] + "%0D%0A%0D%0A";
                         message = message + malTranslationDB[ayaIndex-1] + "%0D%0A%0D%0A";

                         composeAndSendEmail(message);
                         $scope.isSuraLoading = false;

                     });

                 });

             });
         }
     }






     // get the sura details before entering so that the title
     // can be displayed asap
     // save the currentSuraDetails in scope
     $scope.$on('$ionicView.beforeEnter', function (event, viewData ) {
         currentSuraDetails = Suras.get($stateParams.suraIndex)
         $scope.currentSuraDetails = currentSuraDetails;
     })







     // back navigation button clicked
     // if we are at the first page then go to sura list/bookmarks
     // otherwise display previous page
     $scope.goBack = function() {
         if(currentPageStartAya > 0) {
             // not at the first page
             currentPageStartAya = currentPageStartAya - numberOfAyasInAPage;
             $scope.currentSuraDB = currentSurahArray.slice(
                                                        currentPageStartAya,
                                                        currentPageStartAya+numberOfAyasInAPage);
             updateTranslationAyats(currentPageStartAya, currentPageStartAya+numberOfAyasInAPage);
             // if we are not at the first page then display bismillah if allowed
             if(currentPageStartAya <= 0) {
                 displayBismillahIfAllowed();
             }

             updateNavBarNextButtonTitle();
         } else {
             // at the first page
            $window.history.back();
         }
     }






     // next page navigation button clicked
     //
     // sura first page is displayed on load, this method gets called
     // for second page onwards
     //
     // if this sura has number of ayas greater than that can fill a page
     // then next nav button will be enabled.
     //
     // if next nav button is enabled then
     //  hide bismillah as it is required only for the first page
     //  filter and display the next page ayas
     $scope.goNextPage = function() {
         var remainingAyas = currentSuraDetails.ayas - currentPageStartAya;
         if(remainingAyas > numberOfAyasInAPage) {

             // hide bismillah
             $scope.displayBismillah = false;

             // fetch next page ayas
             currentPageStartAya = currentPageStartAya + numberOfAyasInAPage;
             var end = currentPageStartAya + numberOfAyasInAPage;
             if(remainingAyas < numberOfAyasInAPage) {
                 end = remainingAyas;
             }

             $scope.currentSuraDB = currentSurahArray.slice(
                                                        currentPageStartAya,
                                                        end);

             updateTranslationAyats(currentPageStartAya, end);

             updateNavBarNextButtonTitle();

             // scroll to the first aya of the page
             $timeout(function() {
                 $ionicScrollDelegate.$getByHandle('ayaScroll').scrollTo(0,0);
             }, 1000);
         }
         else
         {
             // we are at the end of a sura
             loadNextSura();
         }
     }



         
     /**
      * When an end of a sura is reached
      * then load the next sura
      */
     var loadNextSura = function() {
         $scope.displayBismillah = true;
         var nextIndex = currentSuraDetails.index + 1;
         if(nextIndex <= 114) {
             // only 114 suras
             currentPageStartAya = 0;
             currentSuraDetails = Suras.get(nextIndex)
             $scope.currentSuraDetails = currentSuraDetails;
             $scope.isSuraLoading = true;
             var fileName = 'data/quran/' + (currentSuraDetails.index-1) + '.json';
             $http.get(fileName).success(function (data) {
                 currentSurahArray    = data;
                 $scope.isSuraLoading = false;
                 $scope.currentSuraDB = currentSurahArray.slice(currentPageStartAya, currentPageStartAya + numberOfAyasInAPage);
                 updateNavBarNextButtonTitle();
             });

             // get the translation, if its enabled
             if($rootScope.isTranslationChecked)
             {
                 var translationFile = $localstorage.getOptionTranslation();
                 $http.get('data/' + translationFile).success(function (data) {
                     currentSurahTranslationArray = data[currentSuraDetails.index-1];
                     updateTranslationAyats(currentPageStartAya, currentPageStartAya + numberOfAyasInAPage);
                 });

             }

             displayBismillahIfAllowed();

             // scroll to the first aya of the page
             $timeout(function() {
                 $ionicScrollDelegate.$getByHandle('ayaScroll').scrollTo(0,0);
             }, 1000);
         }
         else
         {
             $window.history.back();
         }

     }



     // if title is clicked then go back to prev screen
     // this will be menu or bookmark
     $scope.titleClicked = function() {
         $window.history.back();
     }





      ///////////////////////////////////////////////////////////////////
     // the sura starts loading here - STARTING POINT
     ///////////////////////////////////////////////////////////////////
     $scope.$on('$ionicView.afterEnter', function (viewInfo, state ) {

         // mark that sura is loading to show loading animation
         $scope.isSuraLoading = true;

         // fetch the ayats for the sura from file
         var fileName = 'data/quran/' + (currentSuraDetails.index-1) + '.json';


         $http.get(fileName).success(function (data) {

             // save the entire sura in a local variable
             currentSurahArray    = data;


             // mark as loading complete
             $scope.isSuraLoading = false;


             // if we are here from bookmarks tab then move to the bookmarked aya
             if($stateParams.ayaIndex)
             {
                 // find which page the aya belongs to
                 currentPageStartAya = currentPageStartAyaFromBookmarkAyaIndex($stateParams.ayaIndex);
                 var endAya = currentPageStartAya + numberOfAyasInAPage;

                 // slice the page data for display
                 $scope.currentSuraDB = currentSurahArray.slice(currentPageStartAya, endAya);

                 // find the offset that has to be scrolled to display the bookmarked aya
                 var offset = index > numberOfAyasInAPage ? index%currentPageStartAya : index;

                 // if an aya is specified in the state params
                 // that means we are here from the  bookmarks
                 $timeout(function() {
                    var quotePosition = $ionicPosition.position(angular.element(document.getElementById('aya-' + offset)));
                    $ionicScrollDelegate.$getByHandle('ayaScroll').scrollTo(quotePosition.left, quotePosition.top);
                 }, 1000);
             }
             else
             {
                 // normal case, we are here from sura list menu
                 // store the first page in a scope variable for display
                 $scope.currentSuraDB = currentSurahArray.slice(currentPageStartAya, currentPageStartAya + numberOfAyasInAPage);
             }



             // only show next page button if there is more ayas to fill
             // more pages
             if(parseInt(currentSuraDetails.ayas) > numberOfAyasInAPage) {
                 $scope.nextPageButtonColor = 'button-positive';
                 $scope.nav_next_button_title = "Next page";
             } else {
                 $scope.nextPageButtonColor = 'button-positive';
                 $scope.nav_next_button_title = "Next sura";
             }

         });



         // get the translation, if its enabled
         if($rootScope.isTranslationChecked)
         {
             var translationFile = $localstorage.getOptionTranslation();
             $http.get('data/' + translationFile).success(function (data) {
                 currentSurahTranslationArray = data[currentSuraDetails.index-1];
                 updateTranslationAyats(currentPageStartAya, currentPageStartAya + numberOfAyasInAPage);
             });

         }

         displayBismillahIfAllowed();

     })





      var currentPageStartAyaFromBookmarkAyaIndex = function(ayaIndex) {
          // index starts from zero, so substract one
          var index = ayaIndex-1;
          // find which page the aya belongs to
          var pageStartAya = Math.floor(index/numberOfAyasInAPage) * numberOfAyasInAPage;
          return pageStartAya
      }


     var updateTranslationAyats = function(startIndex, endIndex) {
         if($rootScope.isTranslationChecked && currentSurahTranslationArray.length > 0)
         {
             $scope.translationDB = currentSurahTranslationArray.slice(startIndex, endIndex);

         }
     }



     var displayBismillahIfAllowed = function() {
         // no bismillah for fatiha(1) and tawbah(9) sura
         if(currentSuraDetails.index == 1 || currentSuraDetails.index == 9)
         {
             $scope.displayBismillah = false;
         }
         else
         {
             $scope.displayBismillah = true;
         }
     }




     var updateNavBarNextButtonTitle = function() {
         var remainingAyas = currentSuraDetails.ayas - currentPageStartAya;
         if(remainingAyas > numberOfAyasInAPage) {
             $scope.nextPageButtonColor = 'button-positive';
             $scope.nav_next_button_title = "Next page";
         } else {
             $scope.nextPageButtonColor = 'button-positive';
             if(currentSuraDetails.index == 114)
             {
                 $scope.nav_next_button_title = "End";
             }
             else
             {
                 $scope.nav_next_button_title = "Next sura";
             }

         }
     }



     // remove cache and history of this controller before leaving
     // so that it can always be loaded afresh the next time
     // its entered
     $scope.$on('$ionicView.leave', function (viewInfo, state ) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
     })






     $scope.sendMail = function(emailId,subject,message){
         $window.open("mailto:?subject=" + subject+"&body="+message,"_self");
     };

})









/**
 * Controller for the settings screenn
 */
.controller('SettingsCtrl', function($scope, $rootScope, $ionicPopup, $window, $state, $timeout, $ionicActionSheet, $localstorage, $settingsOptions)
{
    var translationsID = 0;
    var themesID = 1;
    var arabicFontID = 2;
    var arabicFontSizeID = 3;
    var translationFontSizeID = 4;

    $scope.translationTitle = $settingsOptions.getSelectedTranslationTitle($localstorage.getOptionTranslation());
    $scope.themeTitle = $settingsOptions.getSelectedThemeTitle($localstorage.getOptionTheme());
    $scope.arabicFontTitle = $settingsOptions.getSelectedArabicFontTitle($localstorage.getOptionArabicFont());
    $scope.arabicFontSizeTitle = $settingsOptions.getSelectedArabicFontSizeTitle($localstorage.getOptionArabicFontSize());
    $scope.translationFontSizeTitle = $settingsOptions.getSelectedTranslationFontSizeTitle($localstorage.getOptionTranslationFontSize());

    $scope.selectTranslation = function() {
        displayActionSheet(translationsID, 'Select translation', $settingsOptions.getTranslations());
    }

    $scope.isTranslationCheckedOrNot = function(isTranslationChecked) {
        $localstorage.saveOptionTranslationEnabled(isTranslationChecked);
        $rootScope.isTranslationChecked = isTranslationChecked;
    }

    $scope.isWordbyWordCheckedOrNot = function(isWordbyWordChecked) {
        $localstorage.saveOptionWordByWordEnabled(isWordbyWordChecked);
        $rootScope.isWordbyWordChecked = isWordbyWordChecked;
    }


    $scope.selectArabicFont = function() {
        displayActionSheet(arabicFontID, 'Select arabic font', $settingsOptions.getArabicFonts());
    }

    $scope.selectArabicFontSize = function() {
        displayActionSheet(arabicFontSizeID, 'Select arabic font size', $settingsOptions.getArabicFontSizes());
    }

    $scope.selectTranslationFontSize = function() {
        displayActionSheet(translationFontSizeID, 'Select translation font size', $settingsOptions.getTranslationFontSizes());
    }

    $scope.selectTheme = function() {
        displayActionSheet(themesID, 'Select theme', $settingsOptions.getThemes());
    }

    var actionSheetButtonSelected  = function(id, selectionIndex) {
        switch(id) {
            case translationsID:
                var selectedTranslation = $settingsOptions.getSelectedTranslation(selectionIndex);
                $localstorage.saveOptionTranslation(selectedTranslation);
                $rootScope.translation = selectedTranslation;
                $scope.translationTitle = $settingsOptions.getSelectedTranslationTitle($localstorage.getOptionTranslation());
                break;
            case themesID:
                var selectedThemeClass = $settingsOptions.getSelectedThemeClass(selectionIndex);
                $localstorage.saveOptionTheme(selectedThemeClass);
                $rootScope.apptheme = selectedThemeClass;
                $scope.themeTitle = $settingsOptions.getSelectedThemeTitle($localstorage.getOptionTheme());

                // reload window to apply new theme
//                $timeout(function(){
//                    $window.location.reload(true)
//                }, 300);
                break;
            case arabicFontID:
                var selectedArabicFontClass = $settingsOptions.getSelectedArabicFontClass(selectionIndex);
                $localstorage.saveOptionArabicFont(selectedArabicFontClass);
                $rootScope.arabicFont = selectedArabicFontClass;
                $scope.arabicFontTitle = $settingsOptions.getSelectedArabicFontTitle($localstorage.getOptionArabicFont());
                break;
            case arabicFontSizeID:
                var selectedArabicFontSizeClass = $settingsOptions.getSelectedArabicFontSizeClass(selectionIndex);
                $localstorage.saveOptionArabicFontSize(selectedArabicFontSizeClass);
                $rootScope.arabicFontSize = selectedArabicFontSizeClass;
                $scope.arabicFontSizeTitle = $settingsOptions.getSelectedArabicFontSizeTitle($localstorage.getOptionArabicFontSize());
                break;
            case translationFontSizeID:
                var selectedTransFontSizeClass = $settingsOptions.getSelectedTranslationFontSizeClass(selectionIndex);
                $localstorage.saveOptionTranslationFontSize(selectedTransFontSizeClass);
                $rootScope.translationFontSize = selectedTransFontSizeClass;
                $scope.translationFontSizeTitle = $settingsOptions.getSelectedTranslationFontSizeTitle($localstorage.getOptionTranslationFontSize());
                break;
        }
    }

    var displayActionSheet = function(id, title, selectionItemsArray) {
        var items = [];
        for(var selection in selectionItemsArray) {
            items.push({text: selectionItemsArray[selection]})
        }

        $ionicActionSheet.show({
            buttons: items,
            titleText: title,
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(selectionIndex) {
                actionSheetButtonSelected(id, selectionIndex);
                return true;
            }
        });
    }


    $scope.showGoToAyaPopup = function() {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.aya">',
            title: 'Go to an aya',
            subTitle: 'Enter in format sura:aya, e.g. 1:2',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Go</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return $scope.data.aya;

                    }
                }
            ]
        })

        myPopup.then(function(res) {
            var splitArray = res.split(':');
            // open the aya
            $state.go('tab.sura-display', {'suraIndex':splitArray[0], 'ayaIndex' : splitArray[1]});
        });
    }

});