(function() {
    var data = [];
    var audio = new Audio();
    var nowPlaying = null;
    var mainIndex = -1;
    var format = null;
    var items = {
        time: null,
        range: null,
        duration: null,
        mute: null,
        volumen: null
    }

    function init(Id, list){

        if (!Id || !list){
            return new Error('ID and list data are required!');
        }

        console.log(list);

        data = list; //array que contiene los 3 objetos

        //Main Container
        var container = document.getElementById(Id);

        //Info Container
        //***************************************************************
        var infoContainer = document.createElement('div');
        infoContainer.classList.add('info');

        var divimg = document.createElement('div');
        divimg.id = "divimg";

        _posterCurrentSong();

        infoContainer.appendChild(divimg);

                        
        //Player Tools Container
        //***************************************************************
        var playerTools = document.createElement('div');
        playerTools.classList.add('tools');

            var previousContainer = document.createElement('div');
            var nextContainer = document.createElement('div');
            var muteContainer = document.createElement('div');
            var likeContainer = document.createElement('div');

            previousContainer.classList.add('previousContainer');
            nextContainer.classList.add('nextContainer');
            muteContainer.classList.add('muteContainer');
            likeContainer.classList.add('likeContainer');


            //Btns-----------------
            //
            var previousBtn = _composeBtn('main-icons', previousSong, 'img/icons/previous_01.png');
            var nextBtn = _composeBtn('main-icons', nextSong, 'img/icons/next_01.png');
            var playBtn = _composeBtn('mainPlay', _playBtn, 'img/icons/play_01.png');
            var muteBtn = _composeBtn('main-icon', mute, 'img/icons/mute.png');


            // if (audio.paused === true) {
            //     playBtn = _composeBtn('mainPlay', _playBtn, 'img/icons/play_02.png')
            // }

            //Append Elements------- 
            //
            previousContainer.appendChild(previousBtn);
            nextContainer.appendChild(nextBtn);
            muteContainer.appendChild(muteBtn);
    

            var sliderContainer = document.createElement('div');
            sliderContainer.classList.add('sliderContainer');

            playerTools.appendChild(previousContainer); 
            playerTools.appendChild(playBtn);           
            playerTools.appendChild(nextContainer);
            playerTools.appendChild(sliderContainer);
            playerTools.appendChild(likeContainer);
            playerTools.appendChild(sliderContainer);

            sliderContainer.appendChild(_composeSlider());
            sliderContainer.appendChild(_composeVolume());

            audio.addEventListener('durationchange', _durationchange);
            audio.addEventListener('timeupdate', _timeupdate);

        //Songs´s list Container
        //***************************************************************
        var songsList = document.createElement('div');
        songsList.classList.add('songsList');

            var list = document.createElement('ul');
            list.classList.add('list');

            data.forEach(function(song, index){
                var listItem = document.createElement('li');
                listItem.setAttribute('id', index);
                listItem.textContent = song.name;

                listItem.addEventListener('click', function(){
                    nowPlaying = index;
                    this.classList.toggle('colorRose');
                    console.log('list Item', nowPlaying);
                    _load(index);
                    playSong(index);
                });

                list.appendChild(listItem);
            })

            list.classList.add('li');

        songsList.appendChild(list); 

        //Append Elements 
        //***//***//***//***//***//***//***//***//***//***//***//***//**
        container.appendChild(infoContainer);
        container.appendChild(playerTools);
        container.appendChild(songsList);

        console.log(list);
        console.log(audio);

    }


    //SLIDER COMPOSE PLAYER TOOLS
    //****************************

    function _composeSlider(){

        var slider = document.createElement('div');
        slider.classList.add('slider');   
        var timeDiv = document.createElement('div');
        timeDiv.classList.add('timeDiv');
        var rangeDiv = document.createElement('div');
        rangeDiv.classList.add('rangeDiv');
        var durationDiv = document.createElement('div');
        durationDiv.classList.add('durationDiv');
        var time = document.createElement('span');
        time.innerText = '0:00';
        
        var range = document.createElement('input');
        range.setAttribute('type', 'range');
        range.setAttribute('min', '0');
        range.setAttribute('style', 'width: 100%;');
        range.addEventListener('change', function(){
            _setCurrentTime(range.value);
        });
        
        var duration = document.createElement('span');
        duration.innerText = '0:00';

        var muteContainer = document.createElement('div');
        var muteIcon = _composeBtn('muteIcon', _muteIconClick, 'img/icons/sound.png')
        muteContainer.classList.add('mute');
          
        timeDiv.appendChild(time);
        rangeDiv.appendChild(range);
        durationDiv.appendChild(duration);
        muteContainer.appendChild(muteIcon);
        
        slider.appendChild(timeDiv);
        slider.appendChild(rangeDiv);
        slider.appendChild(durationDiv);
        slider.appendChild(muteContainer);
        
        items.time = time;
        items.range = range;
        items.duration = duration;
        items.mute = muteIcon;
        
        return slider;
    }


    //LOAD***********************
    //***************************

    function _load(index){
        mainIndex = index;
        console.log('mainIndex', mainIndex);
        nowPlaying = data[index];
        console.log('nowP', nowPlaying);
        _canPlay();
        console.log('au',audio);

        audio.src = nowPlaying.src[format];
    }

    //IMAGE LOAD*****************
    //***************************

    function _posterCurrentSong(){
            var imgDiv = document.getElementById('divimg');

            if(nowPlaying !== null){
                imgDiv.innerHTML = "";
                var imgSong = document.createElement('img');
                var title = document.createElement('h2');
                var artist = document.createElement('h4');
                imgSong.setAttribute('src', data[mainIndex].src.img);
                imgSong.src = data[mainIndex].src.img;
                title.textContent = data[mainIndex].name;
                artist.textContent = data[mainIndex].artist;
                imgDiv.appendChild(imgSong);
                imgDiv.appendChild(title);
                imgDiv.appendChild(artist);
            }
    }

    //BTN *****************
    //***************************
    //
    function _muteIconClick(){
        mute();
    }
                   
    function _composeBtn(iconClass, callback, url){
            
        var icon = document.createElement('div');
        icon.classList.add(iconClass);

        var elem = document.createElement('img');
        elem.src = url;
        elem.style.width = '20px';
        elem.style.width = '20px';
        icon.appendChild(elem);;
        icon.addEventListener('click', callback);

        return icon;
    }

    function _composeBtnList (iconA, callback, url){
            
        var a = document.createElement('a');
        a.classList.add(iconA);
        a.style.width = "20px";
        a.style.height = "20px";

        var elem = document.createElement('img');
        elem.src = url;
        elem.style.width = '20px';
        elem.style.width = '20px';
        a.appendChild(elem);;
        a.addEventListener('click', callback);

        return a;
    }



    //CONTROL TOOLS**************
    //***************************

    function previousSong(){
        var previousIndex = mainIndex-1;
        if(previousIndex < 0 ) {
            return false;
        };
        _load(previousIndex);
        playSong(0);
    }

    function nextSong(){
        var nextIndex = mainIndex+1;
        if(mainIndex >= data.length) return false;
        _load(nextIndex);
        playSong(0);
    }

    function mute(){
        audio.muted = !audio.muted;
    }

    function _playBtn(event){
        var element = event.target;
        if(audio.paused) playSong(0);
        else pauseSong(0);
    }

    function _playBtnList(event){
        var element = event.target;
        element.classList.toggle('mainPlay');
        element.classList.toggle('mainPause');
        
        if(audio.paused) playSongList();
        else pauseSong();
       
    }

    function setVolume(volume){
        audio.volume = volume > 0 ? volume/100 : 0;
    }


    //COMPOSE LOGIC CONTROLS*****
    //***************************

    function playSong(){
        if(!nowPlaying) _load(0);
        audio.play();
        _posterCurrentSong();
    }

    function _durationchange(){
        items.duration.innerText = _toMinutes(audio.duration);
        items.range.setAttribute('max', audio.duration);
    }
    
    function _timeupdate(){
        items.time.innerText = _toMinutes(audio.currentTime);
        items.range.value = audio.currentTime;
        if (audio.currentTime === audio.duration) {  
            nextSong();
        }
    }

    function _composeVolume(){
        var volumeRange = document.createElement('input');
        volumeRange.setAttribute('type', 'range');
        volumeRange.setAttribute('value', audio.volume * 100);
        volumeRange.setAttribute('min', 0);
        volumeRange.setAttribute('max', 100);
        volumeRange.classList.add('volumeRange');
        
        volumeRange.addEventListener('change', function(){
            setVolume(volumeRange.value);
        });
        
        return volumeRange;
    }


    function _toMinutes(time){

        if (isNaN(time)) time = '0:00';

        duration = parseInt(audio.duration);
        currentTime = parseInt(audio.currentTime);
        time = duration - currentTime;
    
    
        s = time % 60;
        m = Math.floor( time/ 60 ) % 60;
        
        if (isNaN(s)) s = '0';
         if (isNaN(m)) m = '0';
        s = s < 10 ? "0"+s : s;
        m = m < 10 ? "0"+m : m;

        time = m+":"+s;

        return time;
    }


    function pauseSong(){
        audio.pause();
    }

    function _canPlay(){
        var canPlay = {
            mp3: audio.canPlayType('audio/mp3'),
            ogg: audio.canPlayType('audio/ogg'),
            wav: audio.canPlayType('audio/wav')
        };
        if(canPlay.mp3 !== '') return format = 'mp3';
        if(canPlay.ogg !== '') return format = 'ogg';
        if(canPlay.wav !== '') return format = 'wav';
    }

    function _setCurrentTime(time){
        audio.currentTime = time;
    }

    (setInterval(function(){
        if(audio.duration === 0)
            nextSong();

    }), 1000);


    //SAVE DATA******************
    //***************************

     function saveData() {

        var savedTime = audio.currentTime;
        var savedDuration = audio.duration;
        var savedIndex = nowplaying;
        var savedVolumen = volumen.range;

        var savedData = {
            index: savedIndex,
            time: audio.currentTime,
            duration: audio.duration,
            volumen: volumen.range
        }

        saveModule.set('audioData', savedData);
        saveModule.get('audioData');

    }

    /************************/

    window.AudioPlayer = {
        init: init,
        playSong: playSong,
        saveData: saveData
    }
})()