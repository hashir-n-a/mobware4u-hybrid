/**
 * Deprecated : Not used anymore
 * Only used to extract quran from original sources
 */
angular.module('starter.quran', [])

    .factory('Quran', function($http) {

        var processedSuras = [];
        var processedTranslation = [];

        return {
            extractSuraAndPrintToConsole: function() {
                var fileName = 'data/quran_orig.json';
                $http.get(fileName).success(function (data) {
                        quranDB = data[0].data;

                        var currentSuraArray   = [];
                        var currentAyatArray   = [];
                        var currentAyatIndex   = 1;
                        var currentSuraIndex   = 1;

                        for(var i=0; i<quranDB.length; i++) {
                            if(quranDB[i].sura == currentSuraIndex)
                            {
                                if(quranDB[i].aya == currentAyatIndex)
                                {
                                    currentAyatArray.push(quranDB[i]);
                                }
                                else
                                {
                                    currentSuraArray.push(currentAyatArray);
                                    currentAyatIndex = currentAyatIndex + 1;
                                    currentAyatArray = [];
                                    currentAyatArray.push(quranDB[i]);
                                }
                            }
                            else
                            {
                                currentSuraArray.push(currentAyatArray);
                                processedSuras.push(currentSuraArray);
                                currentSuraIndex = currentSuraIndex + 1;
                                currentSuraArray = [];
                                currentAyatArray = [];
                                currentAyatArray.push(quranDB[i]);
                                currentAyatIndex = 1;

                            }
                        }

                        currentSuraArray.push(currentAyatArray);
                        processedSuras.push(currentSuraArray);

                        console.log(JSON.stringify(processedSuras[51]));

                    });
            },

            extractTranslationsAndPrintToConsole:function() {
                $http.get('data/ur.maududi.orig').success(function (data) {
                    var translationLinesArray = data.split('\n');

                    var currentAyatArray   = [];
                    var currentSuraIndex   = 1;
                    processedTranslation   = [];

                    for(var i in translationLinesArray)
                    {
                        var line = translationLinesArray[i];
                        var lineSplitArray = line.split('|');

                        if(parseInt(lineSplitArray[0]) == currentSuraIndex) {
                            currentAyatArray.push(lineSplitArray[2]);
                        }
                        else
                        {
                            processedTranslation.push(currentAyatArray);
                            currentSuraIndex = currentSuraIndex + 1;
                            currentAyatArray = [];
                            currentAyatArray.push(lineSplitArray[2]);
                        }
                    }

                    console.log(JSON.stringify(processedTranslation));
                })
            }
        };


    });
