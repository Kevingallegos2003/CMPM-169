// P_2_3_6_01
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

/**
 * draw tool. draws a specific module according to
 * its east, south, west and north neighbours.
 *
 * MOUSE
 * drag left           : draw new module
 * drag right          : delete a module
 *
 * KEYS
 * del, backspace      : clear screen
 * g                   : toggle show grid
 * d                   : toggle show module values
 * s                   : save png
 */
'use strict';

var modules;

var tileSize = 50;
var gridResolutionX;
var gridResolutionY;
var tiles = [];

var doDrawGrid = true;
var isDebugMode = false;
var Rotation = 0;
var wierdlines = false;

function preload() {
  // load SVG modules
  modules = [];

  // METHOD 1: Looping through local files is efficient
  // for (var i = 0; i < 16; i++) {
  //   modules[i] = loadImage('data/' + nf(i, 2) + '.svg');
  // }

  // METHOD 2: Read files one-by-one
  modules[0] = loadImage('data/00.svg');
  modules[1] = loadImage('data/01.svg');
  modules[2] = loadImage('data/02.svg');
  modules[3] = loadImage('data/03.svg');
  modules[4] = loadImage('data/04.svg');
  modules[5] = loadImage('data/05.svg');
  modules[6] = loadImage('data/06.svg');
  modules[7] = loadImage('data/07.svg');
  modules[8] = loadImage('data/08.svg');
  modules[9] = loadImage('data/09.svg');
  modules[10] = loadImage('data/10.svg');
  modules[11] = loadImage('data/11.svg');
  modules[12] = loadImage('data/12.svg');
  modules[13] = loadImage('data/13.svg');
  modules[14] = loadImage('data/14.svg');
  modules[15] = loadImage('data/15.svg');

}

function setup() {
  // use full window size
  createCanvas(windowWidth, windowHeight);

  cursor(CROSS);
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(0.15);
  textSize(8);
  textAlign(CENTER, CENTER);

  gridResolutionX = round(width / tileSize) + 2;
  gridResolutionY = round(height / tileSize) + 2;

  initTiles();
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    if (mouseButton == LEFT) setTile();
    if (mouseButton == RIGHT) unsetTile();
  }

  if (doDrawGrid) drawGrid();

  drawModules();
}

function initTiles() {
  for (var gridX = 0; gridX < gridResolutionX; gridX++) {
    tiles[gridX] = [];
    for (var gridY = 0; gridY < gridResolutionY; gridY++) {
      tiles[gridX][gridY] = 0;
    }
  }
}

function setTile() {
  // convert mouse position to grid coordinates
  var gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  var gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
  if (wierdlines){
    var rnd = Math.floor(Math.random()*2)+1;
    print(rnd);
    if(rnd == 1){
        for(let x = 0; x < 5; x++ ){
            tiles[gridX+x][gridY]= 1;
        }
    }
    else{
        for(let x = 0; x < 5; x++ ){
            tiles[gridX][gridY+x]= 1;
        }
    }
  }
}

function unsetTile() {
  var gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  var gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 0;
}

function drawGrid() {
  for (var gridX = 0; gridX < gridResolutionX; gridX++) {
    for (var gridY = 0; gridY < gridResolutionY; gridY++) {
      var posX = tileSize * gridX - tileSize / 2;
      var posY = tileSize * gridY - tileSize / 2;
      fill(255);
      if (isDebugMode) {
        if (tiles[gridX][gridY] == 1) fill(220);
      }
      rect(posX, posY, tileSize, tileSize);
    }
  }
}

function drawModules() {
  for (var gridX = 0; gridX < gridResolutionX - 1; gridX++) {
    for (var gridY = 0; gridY < gridResolutionY - 1; gridY++) {
      // use only active tiles
      if (tiles[gridX][gridY] == 1) {
        // check the four neightbours, each can be true or false
        var NORTH = str(tiles[gridX][gridY - 1]);
        var WEST = str(tiles[gridX - 1][gridY]);
        var SOUTH = str(tiles[gridX][gridY + 1]);
        var EAST = str(tiles[gridX + 1][gridY]);
        //print(NORTH, WEST, SOUTH, EAST);
        // create binary result out of it
        var binaryResult = NORTH + WEST + SOUTH + EAST;
        // convert binary string to a decimal value from 0 - 15
        var decimalResult = parseInt(binaryResult, 2);
        decimalResult = Math.abs(decimalResult-Rotation);

        var posX = tileSize * gridX - tileSize / 2;
        var posY = tileSize * gridY - tileSize / 2;

        // decimalResult is also the index for the shape array
        image(modules[decimalResult], posX, posY, tileSize, tileSize);

        if (isDebugMode) {
          fill(150);
          text(decimalResult + '\n' + binaryResult + '\n' + Rotation, posX, posY);
        }
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if(key == 'r' || key == 'R') Rotation+= 1; if(Rotation>15){Rotation=0;}
  if (keyCode == DELETE || keyCode == BACKSPACE) initTiles();
  if (key == 'e' || key == 'E') wierdlines = !wierdlines;
  if (key == 'g' || key == 'G') doDrawGrid = !doDrawGrid;
  if (key == 'd' || key == 'D') isDebugMode = !isDebugMode;
}
