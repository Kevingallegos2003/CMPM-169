class Gallery extends Phaser.Scene {
    constructor() {
        super("GalleryScene");
        this.my = {sprite: {}};
    }
    preload(){
        this.load.image('weatherbg', 'Scenes/weatherbg.jpg');
        this.load.image('WeatherMan', 'Scenes/saul.webp');
        this.load.image('tab', 'Scenes/weatherNews.png');
        this.load.image('BOX', 'Scenes/nom.png');
        this.load.image('image1', 'Scenes/SaulStretch.png');
        this.load.image('image2', 'Scenes/waltuh.png');
        this.load.image('image3', 'Scenes/trout.jpg');
    }
    create(){
        this.bg = this.add.sprite(560, 400, 'weatherbg');
        this.bg.setScale(1.3);
        this.bgTv = this.add.sprite(795, 425, 'image1');
        this.bgTv.setScale(1);
        this.man = this.add.sprite(300,700, 'WeatherMan');
        this.man.setScale(.7);
        this.box = this.add.sprite(560,50, 'BOX');
        this.tab = this.add.sprite(560,350, 'tab');
        this.tab.setScale(1.5);        
        this.ManText = this.add.text(25, 25, "Weather Report",{ font: '32px Arial', fill: '#000000' });
        this.ManText.setScale(1);
        this.SlideText = this.add.text(560, 750, "Weather Report");
        this.SlideText.setScale(2);
        this.tvText = this.add.text(560, 350, "Weather Report");
        this.weather();

    }
    update(){
        this.SlideText.x += 3;
        if(this.SlideText.x > 1130){
            this.SlideText.x = -1500;
        }
    }
    async weather(){
        try{
            const url="https://api.openweathermap.org/data/2.5/weather?zip=95060&appid=c6da0ac7d6b77b3edc72fc28eed8458c&units=imperial";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            this.ruleGrammar = tracery.createGrammar({
                "Greetings":["G'day ", "Hello ", "Oi ya there ", "Oi wankers ", "Hola Brochachos in ","Howdy ","Top of the morning to ya "],
                "Saul":["#Greetings#"+data.name+", todays weather is particulary "+data.weather[0].description+" with\n temperatures around "+data.main.temp+"F, although it feels like "+data.main.feels_like+"F today."],
                "Blurb":["windspeeds today at: "+data.wind.speed+" mph, with a humidity of "+data.main.humidity+"%","windspeed: "+data.wind.speed+" mph, humidity: "+data.main.humidity+"%"+", Auril, spell ICUP","windspeed: "+data.wind.speed+" mph, humidity: "+data.main.humidity+"%"+", Spiderman sightings on the rise at Bondi Beach"],
                "tvBackground":['image1','image2','image3'],
            });
            this.bgTv.setTexture(this.ruleGrammar.flatten("#tvBackground#"));
            this.tvText.setText("Cloudiness: "+data.clouds.all+"%  \n  Visibility: "+data.visibility+"m\nSunrise: "+new Date(data.sys.sunrise*1000).toLocaleTimeString()+"  \n  Sunset: "+new Date(data.sys.sunset*1000).toLocaleTimeString());
            this.ManText.setText(this.ruleGrammar.flatten("#Saul#"));
            this.tvText.setScale(1.4);
            this.SlideText.setText(this.ruleGrammar.flatten("#Blurb#"));
        }
        catch(error){
            console.log(error);
        }
    }
}