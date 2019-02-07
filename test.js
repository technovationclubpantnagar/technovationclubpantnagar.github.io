var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

canvas.style.width = canvas.width + "px"; 
canvas.style.height = canvas.height + "px"; 

var ctx = canvas.getContext('2d');

var rect = new Rectangle(100,100,100,100);
rect.color = new Color(255, 0, 0 ,1);

var hero = new Circle(100, 50, 50);
hero.color = new Color(255, 0, 0 ,1);

var directionX = 10;

var rectPos = new Vector2();
var heroPos = new Vector2();

setInterval(function()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	rectPos.x = Math.floor((Math.random() * 100) + 1);
	rectPos.y = rectPos.x;
	
	heroPos.x += directionX;
	heroPos.y += 10;
	hero.SetPosition(heroPos);
	hero.Draw(ctx);
	
	if(input.mouseIsDown)
		directionX *= -1;
	
	ctx.translate(0, 10);
	
	
	ctx.font = "100px Aerial";
    ctx.fillStyle = "red";
    ctx.fillText("hello" + rectPos.x, 10, 100);
	
}, 100);
