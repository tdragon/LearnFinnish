
Games["listen_choose"] = {
    // "words" : [] - here will be words
    _currentWordIndex: 0,
    _enWords: [],//4 english variants to choose (indexes)
    _elementEnWords : [],
    _elementEnImages : [],
    _elementSound: 0,

    "start" : function() {
        console.log("Start game find_image");
        this._currentWordIndex = Math.floor(Math.random() * this.words.length);

        var that = this;
        for(let i = 1; i <= 4; ++i) {
            this._elementEnWords[i] = document.getElementById("listen_choose_en_" + i);
            this._elementEnImages[i] = document.getElementById("listen_choose_img_en_" + i);
            this._elementEnWords[i].onclick = function() {that.onWordSelected(i);}
            this._elementEnImages[i].onclick = function() {that.onWordSelected(i);}
        }

        this._elementSound = document.getElementById("listen_choose_sound");

        this.playCurrentWordAndShowGuesses();       
    },
    "stop" : function() {
        console.log("Stop game choose_word");
        this._elementSound.src = "";
    },
    
    "onPrevious": function() {
        this._currentWordIndex--;
        if (this._currentWordIndex < 0) {
            this._currentWordIndex = this.words.length - 1;
        }
        this.playCurrentWordAndShowGuesses();
    },

    "onNext": function() {
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length) {
            this._currentWordIndex = 0;
        }
        this.playCurrentWordAndShowGuesses();
    },

    "onWordSelected": function(_wordIndex) {
        console.log("Selected: " + _wordIndex);
        let wordIndex = this._enWords[_wordIndex];
        let currentWord = this.words[this._currentWordIndex];
        let chosenWord = this.words[wordIndex];
        if (currentWord.fi === chosenWord.fi) {
            this.win(_wordIndex);
        } else {
            this.lose(_wordIndex)
        }
    },

    "win" : function(index) {
        //this._elementSound.src = helpers.getAudioSrc(this.words[this._currentWordIndex]);
        //this._elementSound.play();
        helpers.playSuccessAnimationOnElement(this._elementEnImages[index], 2000);

        var that = this;
        setTimeout(function() {that.onNext()}, 2000);
    },

    "lose": function(index) {
        helpers.playFailureAnimationOnElement(this._elementEnImages[index], 2000);
        //this._elementEnImages[index].src = "img/red.jpg";
    },

    "playCurrentWordAndShowGuesses" : function() {
        this._elementSound.src = helpers.getAudioSrc(this.words[this._currentWordIndex]);
        this._elementSound.play();
        
        for(let i = 1; i <= 4; ++i) {
            this._enWords[i] = undefined;
        }
        for(let i = 1; i <= 4; ++i) {
            this._enWords[i] = this.getRandomWord(this._currentWordIndex, this._enWords);
        }
        this._enWords[Math.floor(1 + Math.random() * 4)] = this._currentWordIndex;//one of them is real

        for(let i = 1; i <= 4; ++i) {
            let word = this.words[this._enWords[i]];
            this._elementEnWords[i].textContent = word.en;
            this._elementEnImages[i].src = helpers.getImgSrc(word);
        }
    },

    "getRandomWord": function(excludeWord, array) {
        do {
            let r = Math.floor(Math.random() * this.words.length);
            if (r != excludeWord && array.indexOf(r) === -1) {
                return r;
            }
        } while(true);
        
    }
}
