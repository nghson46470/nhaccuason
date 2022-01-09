const $ = document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)
const nameSong = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('audio')
const btnPlay = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')


const app = {
    currentIndex:0,
    songs : [
        {
        name: "ngai yeu",
        singer: "khac viet",
        path: "./songs/ngaiyeu.mp3",
        image: "./img/ngaiyeu.jpg"
        },
        {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "./songs/(FREE) Lo-fi Type Beat - You're My Everything.mp3",
        image:"./img/myeverything.jpg"
        },
        {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:"./songs/có hẹn với thanh xuân - MONSTAR - official music video.mp3",
        image: "./img/cohenvoithanhxuan.jpg"
        },
        {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "./songs/IN THE RAIN - hooligan. ft. KIM KUNNI (Prod. by Jsdrmns).mp3",
        image:"./img/intherain.jpg"
            
        },
        {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "./songs/Pink Sweat$ - At My Worst (Lyrics).mp3",
        image:"./img/AtMyWorst.jpg"
            
        },
        {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:"./songs/TO THE MOON - hooligan. (Special MV).mp3",
        image:"./img/TOTHEMOON.jpg"
            
        },
        {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "./songs/Zack Tabudlo - Binibini (Official Music Video).mp3",
        image:"./img/Binibini.jpg"
            
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./songs/Zack Tabudlo - Nangangamba (Lyric Video).mp3",
            image:"./img/Nangangamba.jpg"
            
        }
    ],

    //render songs
    render: function(){

        const htmls = this.songs.map(function(song,index){
            return `
            <div class="song" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        
        })

        playList.innerHTML = htmls.join('')
    },


    // đặt biến currentSong = songs[this.currentIndex]
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            },
        })
    },


    // xử lý các sự kiện
    handleEvens : function(){
        const cd = $('.cd')
        const widthCd = cd.offsetWidth

        // sự kiện khi vuốt màn hình xuống
        document.onscroll= function(){
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            newWidth = widthCd - window.scrollY 
            cd.style.width = newWidth + 'px'
            if(newWidth < 0){
                newWidth = 0
                cd.style.width = newWidth + 'px' 
            }
            cd.style.opacity = (newWidth / widthCd)
        }

        // hành động quay đĩa 
        const cdThumbAnimation = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
                duration: 10000,
                iterations: Infinity
        })
        cdThumbAnimation.pause()


        // xử lí khi click vào nút play
        btnPlay.onclick = function(){
            player.classList.toggle('playing')
            if( player.classList.contains('playing')){
                audio.play()
                cdThumbAnimation.play()
            }
            else{
                audio.pause()
                cdThumbAnimation.pause()
            }
        }

        //xử kiện cho thanh progress chạy
        audio.ontimeupdate = function(){
            if(audio.duration){
                var progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        
        // xử lý tua bài
        progress.onchange = function(e){
            var seekTime =  audio.duration / 100 * e.target.value       
            audio.currentTime = seekTime
        }

        

   },

    // load bài hát hiện đang phát
    loadCurrentSong : function(){
        nameSong.innerText = this.currentSong.name
        cdThumb.style.backgroundImage =`url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    // xử lý khi click vào randomBtn hoặc repeatBtn
    handleClickBtn : function(){
        randomBtn.onclick= function(){        
            randomBtn.classList.toggle('active')
        }
        repeatBtn.onclick= function(){ 
            repeatBtn.classList.toggle('active')
        }
    },

    // đặt background khi click vào bài
    activeSong : function(){
        const songArray = $$('.song')
        for(var i = 0 ; i < songArray.length; i++) {
            if(i!==app.currentIndex){
                songArray[i].classList.remove('active')
            }
            else{
                songArray[i].classList.add('active')
            }
        }
    },

    // xử lý khi click vào bài
    handleClickSong : function(){
            playList.onclick= function(e){
                songNode = e.target.closest('.song:not(.active)')
                if(songNode){
                    app.currentIndex =Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    player.classList.add('playing')
                    audio.play()
                    app.activeSong(app.currentIndex)
                }
                
            }
        
    },
   
    // chuyển bài
    nextSong : function(){
        nextBtn.onclick= function(){
            randomIndex =Math.floor(Math.random()*(app.songs.length))
            if(randomBtn.classList.contains('active')){
                app.currentIndex = randomIndex
            }
            else if (repeatBtn.classList.contains('active')){
                app.currentIndex = app.currentIndex
            }
            else{
                app.currentIndex++
                if(app.currentIndex > app.songs.length-1){
                    app.currentIndex=0
                }
            }
            app.loadCurrentSong()
            
            if( player.classList.contains('playing')){
                audio.play()
            }
            else{
                audio.pause()
            }
            
            app.activeSong(app.currentIndex)
            app.scrollActiveSong()
        }
    },

    prevSong : function(){
        prevBtn.onclick = function(){
            randomIndex =Math.floor(Math.random()*(app.songs.length))
            if(randomBtn.classList.contains('active')){
                app.currentIndex = randomIndex
            }
            else if (repeatBtn.classList.contains('active')){
                app.currentIndex = app.currentIndex
            }
            else{
                app.currentIndex--
                if(app.currentIndex < 0){
                    app.currentIndex=app.songs.length-1
                }
            }
            app.loadCurrentSong()
            if( player.classList.contains('playing')){
                audio.play()    
            }
            else{
                audio.pause()
            }
            app.activeSong(app.currentIndex)
            app.scrollActiveSong()

        }
    },


    // đưa bài đang hát vào màn hình
    scrollActiveSong: function(){
        setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block : 'end'
            })
        },200)
    },

    // xử lí khi hết bài
    endSong : function(){
        audio.onended = function(){
            nextBtn.click()
        }
    },
    


    start : function(){
        this.handleClickBtn()
        this.render()
        this.handleEvens()
        this.defineProperties()
        this.loadCurrentSong()
        this.nextSong()
        this.prevSong()
        this.endSong()
        this.activeSong()
        this.handleClickSong()
    }
        
}

app.start()