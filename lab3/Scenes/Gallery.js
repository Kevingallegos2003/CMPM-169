class Gallery extends Phaser.Scene {
    constructor() {
        super("GalleryScene");
        this.my = {sprite: {}};
    }
    preload(){
        this.Wid = 576;
        this.Height = 350;
        this.load.setPath("./img/");
        this.load.image("F1","CO.png");
        this.load.video("video", "Composer.mp4");
        this.load.video("video2", "Composer2.mp4");
        this.load.video("video3", "Composer3.mp4");
        this.load.audio("song1", "morning_mood.mp3");
        this.load.audio("song2", "song2.mp3");
        this.load.audio("song3", "song3.mp3");
        this.play = 0;
    }
    create(){
        let my = this.my;
        my.sprite.song1 = this.sound.add("song1");
        my.sprite.song2 = this.sound.add("song2");
        my.sprite.song3 = this.sound.add("song3");
        my.sprite.f1 = (this.add.sprite(this.Wid, this.Height, "F1"));
        my.sprite.bg = (this.add.video(this.Wid, this.Height, "video"));
        my.sprite.bg2 = (this.add.video(this.Wid, this.Height, "video2"));
        my.sprite.bg3 = (this.add.video(this.Wid, this.Height, "video3"));
        this.my.sprite.bg.visible = false;
        this.my.sprite.bg3.visible = false;
        this.my.sprite.bg2.visible = false;
        //my.sprite.bg.play();
        document.getElementById("song1")?.addEventListener("click", () => {
            console.log("click");
            if(!my.sprite.song1.isPlaying){
            my.sprite.song1.play();
            //my.sprite.bg.play(loop = true);
            this.play++;
            }
            else{
                my.sprite.song1.stop();
                //my.sprite.bg.stop();
                this.play--;
            }
                    if(this.play == 2){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg2.visible = true;
            this.my.sprite.bg2.play(loop = true);
        }
        else if(this.play == 3){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = true;
            this.my.sprite.bg3.play(loop = true);
        }
        else{
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg.visible = true;
            this.my.sprite.bg.play(loop = true);
        }
        });
        document.getElementById("song2")?.addEventListener("click", () => {
            console.log("click");
            if(!my.sprite.song2.isPlaying){
            my.sprite.song2.play();
            //my.sprite.bg.play(loop = true);
            this.play++;
            }
            else{
                my.sprite.song2.stop();
                //my.sprite.bg.stop();
                this.play--;
            }
                    if(this.play == 2){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg2.visible = true;
            this.my.sprite.bg2.play(loop = true);
        }
        else if(this.play == 3){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = true;
            this.my.sprite.bg3.play(loop = true);
        }
        else{
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg.visible = true;
            this.my.sprite.bg.play(loop = true);
        }
        });
        document.getElementById("song3")?.addEventListener("click", () => {
            console.log("click");
            if(!my.sprite.song3.isPlaying){
                my.sprite.song3.play();
                //my.sprite.bg.play(loop = true);
                this.play++;
            }
            else{
                my.sprite.song3.stop();
                //my.sprite.bg.stop();
                this.play--;
            }
                    if(this.play == 2){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg2.visible = true;
            this.my.sprite.bg2.play(loop = true);
        }
        else if(this.play == 3){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = true;
            this.my.sprite.bg3.play(loop = true);
        }
        else{
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg.visible = true;
            this.my.sprite.bg.play(loop = true);
        }
        });
        
    }
    update(){
        
    }
    ComposerChange() {
        if(this.play == 2){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg2.visible = true;
            this.my.sprite.bg2.play(loop = true);
        }
        else if(this.play == 3){
            this.my.sprite.bg.visible = false;
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = true;
            this.my.sprite.bg3.play(loop = true);
        }
        else{
            this.my.sprite.bg2.visible = false;
            this.my.sprite.bg3.visible = false;
            this.my.sprite.bg.visible = true;
            this.my.sprite.bg.play(loop = true);
        }
    }
}