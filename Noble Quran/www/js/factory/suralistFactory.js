angular.module('starter.suralist', [])

    .factory('Suras', function() {

        var suras = [];

        // type = 0 for MECCAN and 1 = MEDINIAN
        function sura (index, start, ayas, order, rukus, name, tname, ename, type) {
            this.index = index;
            this.start = start;
            this.ayas  = ayas;
           /* this.order = order;
            this.rukus = rukus;
            this.name  = name;*/
            this.tname = tname;
            this.ename = ename;
            this.type = type;

            var sura = {index: index, start: start, ayas:ayas, /*order:order, rukus:rukus, name:name,*/ tname:tname, ename:ename, type:type};
            suras.push(sura);
        };

        // initialise the list of surahs
        sura(1, 0, 7, 5, 1, "الفاتحة", "Al-Faatiha", "The Opening", 0);
        sura(2, 7, 286, 87, 40, "البقرة", "Al-Baqara", "The Cow", 1);
        sura(3, 293, 200, 89, 20, "آل عمران", "Aal-i-Imraan", "The Family of Imraan", 1);
        sura(4, 493, 176, 92, 24, "النساء", "An-Nisaa", "The Women", 1);
        sura(5, 669, 120, 112, 16, "المائدة", "Al-Maaida", "The Table", 1);
        sura(6, 789, 165, 55, 20, "الأنعام", "Al-An'aam", "The Cattle", 0);
        sura(7, 954, 206, 39, 24, "الأعراف", "Al-A'raaf", "The Heights", 0);
        sura(8, 1160, 75, 88, 10, "الأنفال", "Al-Anfaal", "The Spoils of War", 1);
        sura(9, 1235, 129, 113, 16, "التوبة", "At-Tawba", "The Repentance", 1);
        sura(10, 1364, 109, 51, 11, "يونس", "Yunus", "Jonas", 0);
        sura(11, 1473, 123, 52, 10, "هود", "Hud", "Hud", 0);
        sura(12, 1596, 111, 53, 12, "يوسف", "Yusuf", "Joseph", 0);
        sura(13, 1707, 43, 96, 6, "الرعد", "Ar-Ra'd", "The Thunder", 1);
        sura(14, 1750, 52, 72, 7, "ابراهيم", "Ibrahim", "Abraham", 0);
        sura(15, 1802, 99, 54, 6, "الحجر", "Al-Hijr", "The Rock", 0);
        sura(16, 1901, 128, 70, 16, "النحل", "An-Nahl", "The Bee", 0);
        sura(17, 2029, 111, 50, 12, "الإسراء", "Al-Israa", "The Night Journey", 0);
        sura(18, 2140, 110, 69, 12, "الكهف", "Al-Kahf", "The Cave", 0);
        sura(19, 2250, 98, 44, 6, "مريم", "Maryam", "Mary", 0);
        sura(20, 2348, 135, 45, 8, "طه", "Taa-Haa", "Taa-Haa", 0);
        sura(21, 2483, 112, 73, 7, "الأنبياء", "Al-Anbiyaa", "The Prophets", 0);
        sura(22, 2595, 78, 103, 10, "الحج", "Al-Hajj", "The Pilgrimage", 1);
        sura(23, 2673, 118, 74, 6, "المؤمنون", "Al-Muminoon", "The Believers", 0);
        sura(24, 2791, 64, 102, 9, "النور", "An-Noor", "The Light", 1);
        sura(25, 2855, 77, 42, 6, "الفرقان", "Al-Furqaan", "The Criterion", 0);
        sura(26, 2932, 227, 47, 11, "الشعراء", "Ash-Shu'araa", "The Poets", 0);
        sura(27, 3159, 93, 48, 7, "النمل", "An-Naml", "The Ant", 0);
        sura(28, 3252, 88, 49, 8, "القصص", "Al-Qasas", "The Stories", 0);
        sura(29, 3340, 69, 85, 7, "العنكبوت", "Al-Ankaboot", "The Spider", 0);
        sura(30, 3409, 60, 84, 6, "الروم", "Ar-Room", "The Romans", 0);
        sura(31, 3469, 34, 57, 3, "لقمان", "Luqman", "Luqman", 0);
        sura(32, 3503, 30, 75, 3, "السجدة", "As-Sajda", "The Prostration", 0);
        sura(33, 3533, 73, 90, 9, "الأحزاب", "Al-Ahzaab", "The Clans", 1);
        sura(34, 3606, 54, 58, 6, "سبإ", "Saba", "Sheba", 0);
        sura(35, 3660, 45, 43, 5, "فاطر", "Faatir", "The Originator", 0);
        sura(36, 3705, 83, 41, 5, "يس", "Yaseen", "Yaseen", 0);
        sura(37, 3788, 182, 56, 5, "الصافات", "As-Saaffaat", "Those drawn up in Ranks", 0);
        sura(38, 3970, 88, 38, 5, "ص", "Saad", "The letter Saad", 0);
        sura(39, 4058, 75, 59, 8, "الزمر", "Az-Zumar", "The Groups", 0);
        sura(40, 4133, 85, 60, 9, "غافر", "Al-Ghaafir", "The Forgiver", 0);
        sura(41, 4218, 54, 61, 6, "فصلت", "Fussilat", "Explained in detail", 0);
        sura(42, 4272, 53, 62, 5, "الشورى", "Ash-Shura", "Consultation", 0);
        sura(43, 4325, 89, 63, 7, "الزخرف", "Az-Zukhruf", "Ornaments of gold", 0);
        sura(44, 4414, 59, 64, 3, "الدخان", "Ad-Dukhaan", "The Smoke", 0);
        sura(45, 4473, 37, 65, 4, "الجاثية", "Al-Jaathiya", "Crouching", 0);
        sura(46, 4510, 35, 66, 4, "الأحقاف", "Al-Ahqaf", "The Dunes", 0);
        sura(47, 4545, 38, 95, 4, "محمد", "Muhammad", "Muhammad", 1);
        sura(48, 4583, 29, 111, 4, "الفتح", "Al-Fath", "The Victory", 1);
        sura(49, 4612, 18, 106, 2, "الحجرات", "Al-Hujuraat", "The Inner Apartments", 1);
        sura(50, 4630, 45, 34, 3, "ق", "Qaaf", "The letter Qaaf", 0);
        sura(51, 4675, 60, 67, 3, "الذاريات", "Adh-Dhaariyat", "The Winnowing Winds", 0);
        sura(52, 4735, 49, 76, 2, "الطور", "At-Tur", "The Mount", 0);
        sura(53, 4784, 62, 23, 3, "النجم", "An-Najm", "The Star", 0);
        sura(54, 4846, 55, 37, 3, "القمر", "Al-Qamar", "The Moon", 0);
        sura(55, 4901, 78, 97, 3, "الرحمن", "Ar-Rahmaan", "The Beneficent", 1);
        sura(56, 4979, 96, 46, 3, "الواقعة", "Al-Waaqia", "The Inevitable", 0);
        sura(57, 5075, 29, 94, 4, "الحديد", "Al-Hadid", "The Iron", 1);
        sura(58, 5104, 22, 105, 3, "المجادلة", "Al-Mujaadila", "The Pleading Woman", 1);
        sura(59, 5126, 24, 101, 3, "الحشر", "Al-Hashr", "The Exile", 1);
        sura(60, 5150, 13, 91, 2, "الممتحنة", "Al-Mumtahana", "She that is to be examined", 1);
        sura(61, 5163, 14, 109, 2, "الصف", "As-Saff", "The Ranks", 1);
        sura(62, 5177, 11, 110, 2, "الجمعة", "Al-Jumu'a", "Friday", 1);
        sura(63, 5188, 11, 104, 2, "المنافقون", "Al-Munaafiqoon", "The Hypocrites", 1);
        sura(64, 5199, 18, 108, 2, "التغابن", "At-Taghaabun", "Mutual Disillusion", 1);
        sura(65, 5217, 12, 99, 2, "الطلاق", "At-Talaaq", "Divorce", 1);
        sura(66, 5229, 12, 107, 2, "التحريم", "At-Tahrim", "The Prohibition", 1);
        sura(67, 5241, 30, 77, 2, "الملك", "Al-Mulk", "The Sovereignty", 0);
        sura(68, 5271, 52, 2, 2, "القلم", "Al-Qalam", "The Pen", 0);
        sura(69, 5323, 52, 78, 2, "الحاقة", "Al-Haaqqa", "The Reality", 0);
        sura(70, 5375, 44, 79, 2, "المعارج", "Al-Ma'aarij", "The Ascending Stairways", 0);
        sura(71, 5419, 28, 71, 2, "نوح", "Nooh", "Noah", 0);
        sura(72, 5447, 28, 40, 2, "الجن", "Al-Jinn", "The Jinn", 0);
        sura(73, 5475, 20, 3, 2, "المزمل", "Al-Muzzammil", "The Enshrouded One", 0);
        sura(74, 5495, 56, 4, 2, "المدثر", "Al-Muddaththir", "The Cloaked One", 0);
        sura(75, 5551, 40, 31, 2, "القيامة", "Al-Qiyaama", "The Resurrection", 0);
        sura(76, 5591, 31, 98, 2, "الانسان", "Al-Insaan", "Man", 1);
        sura(77, 5622, 50, 33, 2, "المرسلات", "Al-Mursalaat", "The Emissaries", 0);
        sura(78, 5672, 40, 80, 2, "النبإ", "An-Naba", "The Announcement", 0);
        sura(79, 5712, 46, 81, 2, "النازعات", "An-Naazi'aat", "Those who drag forth", 0);
        sura(80, 5758, 42, 24, 1, "عبس", "Abasa", "He frowned", 0);
        sura(81, 5800, 29, 7, 1, "التكوير", "At-Takwir", "The Overthrowing", 0);
        sura(82, 5829, 19, 82, 1, "الإنفطار", "Al-Infitaar", "The Cleaving", 0);
        sura(83, 5848, 36, 86, 1, "المطففين", "Al-Mutaffifin", "Defrauding", 0);
        sura(84, 5884, 25, 83, 1, "الإنشقاق", "Al-Inshiqaaq", "The Splitting Open", 0);
        sura(85, 5909, 22, 27, 1, "البروج", "Al-Burooj", "The Constellations", 0);
        sura(86, 5931, 17, 36, 1, "الطارق", "At-Taariq", "The Morning Star", 0);
        sura(87, 5948, 19, 8, 1, "الأعلى", "Al-A'laa", "The Most High", 0);
        sura(88, 5967, 26, 68, 1, "الغاشية", "Al-Ghaashiya", "The Overwhelming", 0);
        sura(89, 5993, 30, 10, 1, "الفجر", "Al-Fajr", "The Dawn", 0);
        sura(90, 6023, 20, 35, 1, "البلد", "Al-Balad", "The City", 0);
        sura(91, 6043, 15, 26, 1, "الشمس", "Ash-Shams", "The Sun", 0);
        sura(92, 6058, 21, 9, 1, "الليل", "Al-Lail", "The Night", 0);
        sura(93, 6079, 11, 11, 1, "الضحى", "Ad-Dhuhaa", "The Morning Hours", 0);
        sura(94, 6090, 8, 12, 1, "الشرح", "Ash-Sharh", "The Consolation", 0);
        sura(95, 6098, 8, 28, 1, "التين", "At-Tin", "The Fig", 0);
        sura(96, 6106, 19, 1, 1, "العلق", "Al-Alaq", "The Clot", 0);
        sura(97, 6125, 5, 25, 1, "القدر", "Al-Qadr", "The Power, Fate", 0);
        sura(98, 6130, 8, 100, 1, "البينة", "Al-Bayyina", "The Evidence", 1);
        sura(99, 6138, 8, 93, 1, "الزلزلة", "Az-Zalzala", "The Earthquake", 1);
        sura(100, 6146, 11, 14, 1, "العاديات", "Al-Aadiyaat", "The Chargers", 0);
        sura(101, 6157, 11, 30, 1, "القارعة", "Al-Qaari'a", "The Calamity", 0);
        sura(102, 6168, 8, 16, 1, "التكاثر", "At-Takaathur", "Competition", 0);
        sura(103, 6176, 3, 13, 1, "العصر", "Al-Asr", "The Declining Day, Epoch", 0);
        sura(104, 6179, 9, 32, 1, "الهمزة", "Al-Humaza", "The Traducer", 0);
        sura(105, 6188, 5, 19, 1, "الفيل", "Al-Fil", "The Elephant", 0);
        sura(106, 6193, 4, 29, 1, "قريش", "Quraish", "Quraysh", 0);
        sura(107, 6197, 7, 17, 1, "الماعون", "Al-Maa'un", "Almsgiving", 0);
        sura(108, 6204, 3, 15, 1, "الكوثر", "Al-Kawthar", "Abundance", 0);
        sura(109, 6207, 6, 18, 1, "الكافرون", "Al-Kaafiroon", "The Disbelievers", 0);
        sura(110, 6213, 3, 114, 1, "النصر", "An-Nasr", "Divine Support", 1);
        sura(111, 6216, 5, 6, 1, "المسد", "Al-Masad", "The Palm Fibre", 0);
        sura(112, 6221, 4, 22, 1, "الإخلاص", "Al-Ikhlaas", "Sincerity", 0);
        sura(113, 6225, 5, 20, 1, "الفلق", "Al-Falaq", "The Dawn", 0);
        sura(114, 6230, 6, 21, 1, "الناس", "An-Naas", "Mankind", 0);


        return {
            all: function() {
                return suras;
            },
            get: function(suraIndex) {
                return suras[parseInt(suraIndex-1)];
            }
        };


    });
