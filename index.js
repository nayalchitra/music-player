
const api = "http://127.0.0.1:5500/db.json";

const audio = document.querySelector('.song-sound');
let data ; 
let play=false;


(
    async()=>{
      
          try{
            const response = await fetch(api);
            data = await response.json();
            console.log(data);
            document.querySelector('.play-button').style.display = 'none';
            let currentSongIndex = 0;
            sessionStorage.setItem('songIndex',currentSongIndex);
            audio.src = data[currentSongIndex].song;
            document.querySelector(".song-image").src = data[currentSongIndex].image;
            document.querySelector('.song-name').innerHTML = data[currentSongIndex].songName;
            document.querySelector('.song-singer').innerHTML = data[currentSongIndex].singers;

          }catch(err){
            console.log(err);
          }
         

    }
)();

function audioPause(){
    audio.pause();
    play= !play;
}

function audioPlay(){
    audio.play();
    console.log({play});
    play = !play;
}

const playButton = document.querySelector(".play-button");

playButton.addEventListener('click',()=>{
        document.querySelector('.play-button').style.display = 'none';
        document.querySelector('.pause-button').style.display = 'block';
        audioPause();
    
    
})

const pauseButton = document.querySelector('.pause-button');
pauseButton.addEventListener('click',()=>{
    
        document.querySelector('.pause-button').style.display = 'none';
        document.querySelector('.play-button').style.display = 'block';
        audioPlay();
})

const nextButton = document.querySelector(".next-songs");

nextButton.addEventListener('click',()=>{
        let size = data.length;
        let currentSongIndex = sessionStorage.getItem('songIndex');
        
        currentSongIndex = (currentSongIndex+1)%size;
        sessionStorage.setItem('songIndex',currentSongIndex);
        console.log({play});
        audio.src = data[currentSongIndex].song;
        // audio.play();
        document.querySelector(".song-image").src = data[currentSongIndex].image;
        document.querySelector('.song-name').innerHTML = data[currentSongIndex].songName;
        document.querySelector('.song-singer').innerHTML = data[currentSongIndex].singers;
        if(document.querySelector('.play-button').style.display == 'block')
            audioPlay();

})

const previousButton = document.querySelector(".previous-songs");
previousButton.addEventListener('click',()=>{
    let size = data.length;
        let currentSongIndex = sessionStorage.getItem('songIndex');
       
        currentSongIndex = (currentSongIndex - 1 + size)%size;
        sessionStorage.setItem('songIndex',currentSongIndex);
        console.log({currentSongIndex});
        audio.src = data[currentSongIndex].song;
        // audio.play();
        console.log({play});
        document.querySelector(".song-image").src = data[currentSongIndex].image;
        document.querySelector('.song-name').innerHTML = data[currentSongIndex].songName;
        document.querySelector('.song-singer').innerHTML = data[currentSongIndex].singers;
        if(document.querySelector('.play-button').style.display == 'block')
            audioPlay();
})


audio.addEventListener('ended',()=>{
    play = !play;
    document.querySelector('.play-button').style.display = 'none';
    document.querySelector('.pause-button').style.display = 'block';
})