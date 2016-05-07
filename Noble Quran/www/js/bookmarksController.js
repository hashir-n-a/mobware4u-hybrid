angular.module('bookmark.controller', [])



/**
 * Controller that handles the bookmarks tab
 */
.controller('BookmarksCtrl', function($scope, $localstorage, $ionicPopup, $ionicHistory, $state )
{
    /**
     * Load bookmarks and collection from localstorate
     * and initialise scope variable for display.
     * If there are no bookmarks or collections then display empty message.
     */
    var loadBookmarks = function() {
        var bookMarkedAya = $localstorage.getBookmark();
        if(bookMarkedAya == undefined || bookMarkedAya == "") {
            $scope.showBookmark = false;
        }
        else
        {
            $scope.showBookmark = true;
            $scope.bookmark = bookMarkedAya;
        }


        var ayaCollections = $localstorage.getAyaCollections();
        if(ayaCollections == undefined || ayaCollections == "") {
            $scope.showCollections = false;
        }
        else
        {
            $scope.showCollections = true;
            $scope.ayaCollections = ayaCollections;
        }
    }




    /**
     * Delete the bookmarked aya
     * Only one bookmarked aya at a time
     * So display empty message after deletion
     */
    $scope.deleteBookmark = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete',
            template: 'Are you sure you want to delete?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                $localstorage.saveBookmark("");
                $scope.bookmark = undefined;
                $scope.showBookmark = false;
            }
        });
    }




    /**
     * Deletes an aya from the aya collections
     * @param ayaIndex - index of aya in the collection to delete
     */
    $scope.deleteCollections = function(ayaIndex) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete',
            template: 'Are you sure you want to delete?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                var ayaCollections = $localstorage.getAyaCollections();
                ayaCollections.splice(ayaIndex, 1);
                $localstorage.saveToAyaCollections(ayaCollections);
                if(ayaCollections.length == 0) {
                    // if there is no more ayas in collection
                    // set variable to display empty message
                    $scope.showCollections = false;
                }
                $scope.ayaCollections = ayaCollections;
            }
        });
    }


    /**
     * Open the book mark ayah
     */
    $scope.openBookmark = function() {
        var bookmark = $localstorage.getBookmark();
        $state.go('tab.sura-display', {'suraIndex':bookmark.sura, 'ayaIndex' : bookmark.aya});
    }


    /**
     * open the collection aya
      * @param ayaIndex the index of the collection aya to open
     */
    $scope.openCollectionAya = function(ayaIndex) {
        var ayaCollections = $localstorage.getAyaCollections();
        var aya = ayaCollections[ayaIndex];
        $state.go('tab.sura-display', {'suraIndex':aya.sura, 'ayaIndex' : aya.aya});
    }


    /**
     * Refresh bookmarks when bookmarks screen is displayed
     */
    $scope.$on('$ionicView.enter', function (viewInfo, state ) {
        loadBookmarks();
    });




    // init bookmarks on load
    loadBookmarks();

});