//Kevin Gallegos Inspired by:
// M_5_1_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';
let color_1 = "#26619c"
let color_2 = "#A25B00"
var colors = ["red", "yellow", "orange", "blue", "pink", "purple", "white"];
var sketch = function(p) {
  var recursionLevel = 6;
  var startRadius = 100;
  let sound;
  
  

  var width = 1600;
  var height = 800;

  p.setup = function() {
    p.createCanvas(width,height);
    p.frameRate(12);
    //sound.play();

  };

  p.draw = function() {
    if(p.frameCount%100 == 0){
      let temp = color_1;
      color_1 = color_2;
      color_2 = temp; 
    }
    if(recursionLevel > 0){recursionLevel -= p.frameCount/1200;}
    else{recursionLevel=6;}
    let lerp_pos = p.map(p.frameCount%100, 0, 100, 0, 1);
    let col = p.lerpColor(p.color(color_1), p.color(color_2), lerp_pos);
    p.background(col);
    p.smooth();
    p.noFill();
    p.strokeCap('PROJECT');
    p.translate(width / 2, height / 2);
    //----flower one-----------
    drawflower(-300, 0, startRadius, recursionLevel, 0, colors[1]);
    drawflowerStem(-300,0+startRadius);
    //-----Flower two-----------------------
    drawflower(300, 0, startRadius-30, recursionLevel-2, 0, colors[2]);
    drawflowerStem(300,0+startRadius-30);
    //------flower 3-------------------------------
    drawflower(-550, 0, startRadius-60, recursionLevel-1, 0, colors[4]);
    drawflowerStem(-550,0+startRadius-60);
    //------flower 3-------------------------------
    drawflower(550, 0, startRadius-40, recursionLevel-1, 0, colors[3]);
    drawflowerStem(550,0+startRadius-40);
    //----flower 4------------------------------
    drawflower(50, 0, startRadius-70, recursionLevel-2, 1, colors[0]);
    drawflowerStem(50,0+startRadius-70);
    

    for(var x = -600; x<800; x+=75){
      drawfoilage(x, 300, startRadius, 6);
    }

  };

  // ------ recursive function ------
  var drawflower = function(x,y, radius, level,limit, color){
    p.strokeWeight(level*1.5);
    p.stroke("green");
    if(level>limit){p.noFill();}
    else{p.fill(color)}
    p.arc(x, y, radius * 2, radius * 2, 0,Math.PI);
    if (level > limit){
      // left branch
      drawflower(x - radius, y + radius /- 2, radius / 2, level - 1, limit,color);
      // right branch
      drawflower(x + radius, y + radius /-2, radius /2, level - 1,limit,color);
    }
  };
  var drawfoilage = function(x, y, radius,level){
    p.strokeWeight(level*2);
    p.stroke("green");
    p.noFill();
    if(level%2==0){
      p.arc(x ,y, radius*2, radius*2, 0, -(Math.PI)+1);
    }
    else{
      p.arc(x ,y, radius*2, radius*2, (Math.PI), 0);
    }
    if(level>0){
      drawfoilage(x + radius, y + radius / 2, radius /2, level - 1);
      drawfoilage(x - radius, y - radius /- 2, radius / 2, level - 1);
    }

  };
  var drawflowerStem = function(x,y){
    p.strokeWeight(6);
    p.stroke("green");
    p.line(x,y,x,300);
  };

};

var myp5 = new p5(sketch);
