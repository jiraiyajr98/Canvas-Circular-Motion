const canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var mouse={
   x:undefined,
   y:undefined
 }

window.addEventListener('mousemove',function(event){
   mouse.x=event.x;
   mouse.y=event.y;
 });

let particles = [];

function randomColor(colors){

	return colors[Math.floor(Math.random() * colors.length)];

}


function Circle(x,y,radius,color){

	this.x=x;
	this.y=y;
	this.radius=radius;
	this.color=color;
	this.radians = Math.random() * Math.PI *2;
	this.velocity = 0.05;
	this.distanceFromCenter = randonIntInRange(50,200);
	this.lastX;
	this.lastY;
	this.mouseLast = {x:x,y:y};
										

	this.update = () => {

		this.lastX = this.x
		this.lastY = this.y;
		this.radians += this.velocity;
		
		this.mouseLast.x = mouse.x;
		this.mouseLast.y = mouse.y;
		
		this.mouseLast.x += (mouse.x - this.mouseLast.x) * 0.05;
		this.mouseLast.y += (mouse.y - this.mouseLast.y) * 0.05;
		
		
		this.x = this.mouseLast.x + Math.cos(this.radians)*this.distanceFromCenter;
		this.y = this.mouseLast.y + Math.sin(this.radians)*this.distanceFromCenter;
		this.draw();
	};

	this.draw = () => {
   c.beginPath();
   c.strokeStyle = this.color;
	c.lineWidth = this.radius;
	c.moveTo(this.lastX,this.lastY);
	c.lineTo(this.x,this.y);
	c.stroke();
	c.closePath();
  };

}

function randonIntInRange(mini,maxi)
{
	return Math.floor(Math.random() * (maxi - mini + 1)+ mini);
}


function init() {

	for(let i= 0 ; i < 40; i++)
		{
		particles.push(new Circle(canvas.width/2, canvas.height/2 , 10,'blue'));

		

		}

		particles.forEach(particle => {
		particle.draw();
		});
}

function animate(){

	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.05)';
	c.fillRect(0, 0, canvas.width, canvas.height);

	particles.forEach(particle => {
		particle.update();
	});
}

init();
animate();

