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
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        my.sprite = this.add.sprite(960, 560, 'camp');
        my.Box = this.add.sprite(960, 150, 'BOX');
        var animationConfig = {
            key: "spin",
          
            frames: this.anims.generateFrameNumbers("camp", {start: 0, end: 20}),
            repeat: 0,
            frameRate: 16,
        };
        this.anims.create(animationConfig);
        //my.sprite.play("spin",true);
        
        this.ruleGrammar = tracery.createGrammar({
                
            "move":["flock", "race", "glide", "dance", "flee", "lie"],
            "bird":["swan", "heron", "sparrow", "swallow", "wren", "robin"],
            "animal":["#bird#", "Turtle", "Banana Slug", "SilverFish","Panda"],
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
            "FIRST":["#starters# #move#ing #verb#fully #on# the #ground#, a #animal# felt #emotion#\nfor the first time in there life#punctutation# "],
            "seg1":["#ah# the #agent#s couldn't forgive its impatientness."],
            "seg2":["If the words of the #agent# were true, then the #agent# would be\n#poeticDesc#."],
            "seg3":["All would #doThing# at a simple realization that #substance# would be #on# reach" ],
            "line":["#seg1#", "#seg2#", "#seg3#"],
        });
        this.poem = this.ruleGrammar.flatten("#FIRST#");
        console.log(this.poem);
        my.sprite.t = this.add.text(350, 100, this.poem,{ font: '32px Arial', fill: '#000000' });
        
        
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.poem = this.ruleGrammar.flatten("#line#");
            this.my.Box.setVisible(false);
            this.my.sprite.t.setVisible(false);
            this.my.sprite.play("spin",true);
            this.my.sprite.on('animationcomplete', () => {
                this.my.sprite.t.setVisible(true);
                this.my.Box.setVisible(true);
                this.my.sprite.t.setText(this.poem);
            });
            
        }
    }
    Dialogue(){
        this.poem = this.ruleGrammar.flatten("#line#");
    }
    
}