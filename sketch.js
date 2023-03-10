const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var boy,flag,boyImg
var breakButton;
var backgroundImage;
var woodenpost

var collided = false;
function preload() {
  boyImg = loadImage("Boy.png");
  
  flag=loadImage("Red_flag-removebg-preview.png")
  woodenpost=loadImage("Wooden post.png")
  

  backgroundImage = loadImage("Game_Background_38.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  
  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  

  boy=createSprite(100,100,20,20)
  boy.addImage(boyImg)
  boy.scale=0.5
  boy.velocityX = 10;
    woodenpost=createSprite(300,50,20,20)
    woodenpost=createSprite(600,50,20,20)
  breakButton = createButton("");
  breakButton.position(100,300);
  breakButton.class("Cancel.png");
  breakButton.mousePressed(buttonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  if(keyDown(UP_ARROW)){
    boy.velocityY=-2
  }
  if(keyDown(RIGHT_ARROW)){
    boy.velocityX=2
  }
  
  drawSprites()
}

function buttonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}