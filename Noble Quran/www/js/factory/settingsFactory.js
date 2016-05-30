angular.module('settings.options', [])


    .factory('$settingsOptions', ['$localstorage', '$rootScope',function($localstorage, $rootScope) {

            var translations = ['English - Sahih', 'English - Yusuf Ali','Malayalam', 'Urdu'];
            var translationFiles = ['en.sahih', 'en.yusufali', 'ml.abdulhameed', 'ur.maududi'];

            var themes = ['Green', 'Blue', 'White', 'Dark'];
            var themesClasses = ['app-theme-green', 'app-theme-blue', 'app-theme-white', 'app-theme-dark'];

            var arabicFont = ['Default', 'Qalam Majeed', 'KFGQPC Hafs', 'Me-Quran', 'NooreHuda', 'PDMS Saleem' , 'KFGQPC Uthman'];
            var arabicFontClasses = ['arabic-font-default', 'arabic-font-qalam', 'arabic-font-hafs', 'arabic-font-mequran', 'arabic-font-noorehuda', 'arabic-font-saleem', 'arabic-font-uthman'];

            var arabicFontSize = [18, 20, 22, 24, 26, 28, 30, 32];
            var arabicFontSizeClasses = ['arabic-font-size-18', 'arabic-font-size-20', 'arabic-font-size-22',
                'arabic-font-size-24', 'arabic-font-size-26', 'arabic-font-size-28',
                'arabic-font-size-30', 'arabic-font-size-32'];

            var translationFontSize = [12, 14, 16, 18];
            var translationFontSizeClasses = ['trans-font-size-12', 'trans-font-size-14',
                'trans-font-size-16', 'trans-font-size-18'];



            var getItemFromArray2CorrespondingToItemInArray1 = function(array1, array2, item)
            {
                for(var index=0; index<array1.length; index++)
                {
                    if(item == array1[index])
                    {
                        return array2[index];
                    }
                }
            }

            return {
                getTranslations: function() {
                    return translations;
                },
                getSelectedTranslation: function(selectedIndex) {
                    return translationFiles[selectedIndex];
                },
                getSelectedTranslationTitle: function(translationFile) {
                    return getItemFromArray2CorrespondingToItemInArray1(translationFiles, translations, translationFile);
                },
                getThemes: function() {
                    return themes;
                },
                getSelectedThemeClass: function(selectedIndex) {
                    return themesClasses[selectedIndex];
                },
                getSelectedThemeTitle: function(themeClass) {
                    return getItemFromArray2CorrespondingToItemInArray1(themesClasses, themes, themeClass);

                },
                getArabicFonts: function() {
                    var availableFonts = arabicFont;
                    if($rootScope.isTizenPlatform) {
                        availableFonts = ['Default', 'Qalam Majeed', 'PDMS Saleem'];
                    }
                    return availableFonts;
                },
                getSelectedArabicFontClass: function(selectedIndex) {
                    var availableFontsClass = arabicFontClasses;
                    if($rootScope.isTizenPlatform) {
                        availableFontsClass = ['arabic-font-default', 'arabic-font-qalam', 'arabic-font-saleem'];
                    }
                    return availableFontsClass[selectedIndex];
                },
                getSelectedArabicFontTitle: function(font) {
                    return getItemFromArray2CorrespondingToItemInArray1(arabicFontClasses, arabicFont, font);

                },
                getArabicFontSizes: function() {
                    var availableFontSizes = arabicFontSize;
                    if($rootScope.isTizenPlatform) {
                        availableFontSizes = [24, 28, 30, 32];
                    }
                    return availableFontSizes;
                },
                getSelectedArabicFontSizeClass: function(selectedIndex) {
                    var availableFontSizeClasses = arabicFontSizeClasses;
                    if($rootScope.isTizenPlatform) {
                        availableFontSizeClasses = ['arabic-font-size-24', 'arabic-font-size-28','arabic-font-size-30', 'arabic-font-size-32'];
                    }
                    return availableFontSizeClasses[selectedIndex];
                },
                getSelectedArabicFontSizeTitle: function(fontSize) {
                    return getItemFromArray2CorrespondingToItemInArray1(arabicFontSizeClasses, arabicFontSize, fontSize);

                },
                getTranslationFontSizes: function() {
                    return translationFontSize;
                },
                getSelectedTranslationFontSizeClass: function(selectedIndex) {
                    return translationFontSizeClasses[selectedIndex];
                },
                getSelectedTranslationFontSizeTitle: function(fontSize) {
                    return getItemFromArray2CorrespondingToItemInArray1(translationFontSizeClasses, translationFontSize, fontSize);

                }
    }
}]);