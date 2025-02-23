class Gallery extends Phaser.Scene {
    constructor() {
        super("GalleryScene");
        this.my = {sprite: {}};
    }
    preload(){
        this.load.image('BOX', 'Scenes/nom.png');
        this.load.spritesheet('camp', 'Scenes/spritesheet.png',{
            frameWidth: 1920,
            frameHeight: 1080,
        });
    }
    create(){
        let my = this.my;
        my.sprite = this.add.sprite(400, 300, 'camp');
        my.Box = this.add.sprite(400, 100, 'BOX');
        var animationConfig = {
            key: "spin",
          
            frames: this.anims.generateFrameNumbers("camp", {start: 0, end: 20}),
            repeat: 0,
            frameRate: 16,
        };
        this.anims.create(animationConfig);
        //my.sprite.play("spin",true);
        
        var ruleGrammar = tracery.createGrammar({
                
            "move":["flock", "race", "glide", "dance", "flee", "lie"],
            "bird":["swan", "heron", "sparrow", "swallow", "wren", "robin"],
            "animals":["#bird#", "Turtle", "Banana Slug", "SilverFish","Panda"],
            "agent":["cloud", "wave", "#bird#", "boat", "ship"],
            "transVerb":["forget", "plant", "greet", "remember", "embrace", "feel", "love"],
            "emotion":["sorrow", "gladness", "joy", "heartache", "love", "forgiveness", "grace"],
            "substance":["#emotion#", "mist", "fog", "glass", "silver", "rain", "dew", "cloud", "virtue", "sun", "shadow", "gold", "light", "darkness"],
            "adj":["fair", "bright", "splendid", "divine", "inseparable", "fine", "lazy", "grand", "slow", "quick", "graceful", "grave", "clear", "faint", "dreary"],
            "doThing":["come", "move", "cry", "weep", "laugh", "dream"],
            "verb":["fleck", "grace", "bless", "dapple", "touch", "caress", "smooth", "crown", "veil"],
            "ground":["glen", "river", "vale", "sea", "meadow", "forest", "glade", "grass", "sky", "waves"],
            "poeticAdj":["#substance#-#verb.ed#"],
            "poeticDesc":["#poeticAdj#", "by #substance# #verb#'d", "#adj# with #substance#", "#verb.ed# with #substance#"],
            "ah":["ah", "alas", "oh", "yet", "but", "and"],
            "on":["on", "in", "above", "beneath", "under", "by", "within"],
            "punctutation":[",", ":", " ", "!", ".", "?"],
            "starters":["Once upon a time","Twas the #substance#", "Twas the #adj#", "Somewhere #on# the #ground#"],
            "noun":["#ground#", "#agent#"],
            "proto":["#starters# #move#ing #verb#fully #on# the #ground#, a #bird# felt #emotion# for the first time in there life#punctutation# "],
            "proto2":["#ah# the #agent#s couldn't forgive its impatientness."],
            "line":["#proto##proto2#"],
            "poem":["#line##punctutation##line##punctutation##line##punctutation##line#."],
            "origin":["#[sub:#noun#]poem#"]
        });
        var poem = ruleGrammar.flatten("#line#");
        console.log(poem);
        my.sprite.t = this.add.text(0, 100, poem,{ font: '32px Arial', fill: '#00ff00' });
        
        
    }
    update(){
        
    }
    
}