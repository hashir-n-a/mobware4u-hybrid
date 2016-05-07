angular.module('ionic.utils', [])


    .factory('$localstorage', ['$window', function($window) {

        var DEFAULT_IS_TRANSLATION_ENABLED  = 'true'
        var DEFAULT_TRANSLATION             = 'en.sahih'
        var DEFAULT_IS_WORD_BY_WORD_ENABLED = 'true'
        var DEFAULT_THEME                   = 'app-theme-green'
        var DEFAULT_ARABIC_FONT             = 'arabic-font-default'
        var DEFAULT_ARABIC_FONT_SIZE        = 'arabic-font-size-24'
        var DEFAULT_TRANSLATION_FONT_SIZE   = 'trans-font-size-14'


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
            saveQuran: function(quranJSON) {
                setObject("quranJSON", quranJSON);
            },
            saveBookmark: function(bookmarkJSON) {
                setObject("bookmarkedAya", bookmarkJSON);
            },
            getBookmark: function() {
                return getObject("bookmarkedAya");
            },
            saveToAyaCollections: function(ayaCollections) {
                setObject('ayaCollections', ayaCollections);
            },
            getAyaCollections: function() {
                return getObject('ayaCollections');
            },
            saveOptionTranslation : function(translation) {
                set('option-translation', translation);
            },
            getOptionTranslation : function() {
                return get('option-translation', DEFAULT_TRANSLATION);
            },
            saveOptionTheme : function(theme) {
                set('option-theme', theme);
            },
            getOptionTheme : function() {
                return get('option-theme', DEFAULT_THEME);
            },
            saveOptionArabicFont : function(arabicFont) {
                set('option-arabic-font', arabicFont);
            },
            getOptionArabicFont : function() {
                return get('option-arabic-font', DEFAULT_ARABIC_FONT);
            },
            saveOptionArabicFontSize : function(arabicFontSize) {
                set('option-arabic-font-size', arabicFontSize);
            },
            getOptionArabicFontSize : function() {
                return get('option-arabic-font-size', DEFAULT_ARABIC_FONT_SIZE);
            },
            saveOptionTranslationFontSize : function(transFontSize) {
                set('option-translation-font-size', transFontSize);
            },
            getOptionTranslationFontSize : function() {
                return get('option-translation-font-size', DEFAULT_TRANSLATION_FONT_SIZE);
            },saveOptionWordByWordEnabled : function(isEnabled) {
                if(isEnabled)
                {
                   set('option-word-by-word-enabled', 'true');
                }
                else
                {
                   set('option-word-by-word-enabled', 'false');
                }

            },
            getOptionWordByWordEnabled : function() {
                var isEnabled = get('option-word-by-word-enabled', DEFAULT_IS_WORD_BY_WORD_ENABLED);
                if(isEnabled == 'true') return true;
                return false;
            },saveOptionTranslationEnabled : function(isEnabled) {
                if(isEnabled)
                {
                    set('option-translation-enabled', 'true');
                }
                else
                {
                    set('option-translation-enabled', 'false');
                }

            },
            getOptionTranslationEnabled : function() {
                var isEnabled = get('option-translation-enabled', DEFAULT_IS_TRANSLATION_ENABLED);
                if(isEnabled == 'true') return true;
                return false;
            }
        }
    }]);