document.addEventListener("DOMContentLoaded",function(){
	var layoutGame;
	var flag =false;
	var score=0;
	var game = {
		canvas : document.querySelector('canvas'),
		start : function(){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.context = this.canvas.getContext("2d");
			requestAnimationFrame(updateGame);
		}
	}

	function createX(){
		console.log(game.canvas.width);
		return Math.floor(Math.random()*game.canvas.width);
	}
	function createY(){
		return Math.floor(Math.random()*game.canvas.height);
	}
	let arrayAvatar;
	function init(){
		arrayAvatar=[];
		game.start();
		for (var i = 0; i < 70; i++) {
			arrayAvatar.push(new  Avatar(createX(),createY(),6,"red"));
		}
		avavar = new Avatar(20,20,20,"orange");


	}
	init();

	
	function Avatar(x,y,radius,color){
		this.x =x;
		this.y=y;
		this.radius = radius;
		this.color = color;
		this.velocity={
			x:0,
			y:0
		}
	}

	function updateGame(){
		game.context.clearRect(0,0,game.canvas.width,game.canvas.height);
		
		arrayAvatar.forEach(ava=>{
			ava.update();
			ava.touch();
			ava.draw();

		});
		avavar.update();
		
		avavar.drawPiPo();
		avavar.score();
		window.requestAnimationFrame(updateGame);
	}
	Avatar.prototype.draw = function(){
		game.context.beginPath();
		game.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
		game.context.shadowColor = "white";
		game.context.shadowBlur=10;
		game.context.fillStyle = this.color;
		game.context.fill();
		game.context.closePath();
	}
	Avatar.prototype.drawPiPo = function(){
				game.context.beginPath();
				game.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
				game.context.shadowColor = "white";
				game.context.shadowBlur=10;
				game.context.fillStyle = this.color;
				game.context.fill();
				game.context.closePath();
				game.context.beginPath();
				game.context.font = "20px source sanc pro";
				game.context.fillStyle ="white";
				game.context.textAlign="center";
				game.context.fillText("Boss",this.x,this.y+5);
				game.context.closePath();
			}
	Avatar.prototype.update = function(){
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		//console.log(this.velocity.x);
	}
	Avatar.prototype.score = function(){
		game.context.beginPath();
		game.context.font = "30px Arial";
		game.context.fillText(score,game.canvas.width*0.1,game.canvas.height-game.canvas.height*0.05);
		game.context.closePath();
	}

	Avatar.prototype.touch = function(){
		if(this.x - avavar.radius  <= avavar.x && avavar.x < this.x+avavar.radius  && this.y-avavar.radius <= avavar.y&& avavar.y < this.y+avavar.radius){
			
				if(flag ==false){
					this.radius = 0;
					this.x=0;
					this.y=0;
					score++;
					new Audio('http://dight310.byu.edu/media/audio/FreeLoops.com/5/5/Mouse%20Click%20Fast.wav-23232-Free-Loops.com.mp3').play();
					if(score%5==0){
						avavar.radius +=2;
						console.log(avavar.radius);
					}
					if(score==70){
						alert(' Hay lắm Man (>.<!) Bạn đã có tư cách vào trang ! AudioVyVy.com để nghe truyện rồi Haizz');
      
					}
					flag=true;
				}
		}else{
			if(flag==true){
				flag=false;
			}
			
		}
		if(avavar.x>=game.canvas.width){
			avavar.velocity.x = -2;
		}
		if(avavar.x <= 0){
			avavar.velocity.x =2;
		}
		if(avavar.y>=game.canvas.height){
			avavar.velocity.y=-1;
		}
		if(avavar.y<=0){
			avavar.velocity.y = 1;
		}
	}
	document.addEventListener('keydown',event=>{
		//console.log(event);
		if(event.which==37){ avavar.velocity.x = -2;avavar.velocity.y =0; console.log('trái');};
		if(event.which==38) {avavar.velocity.y = -2;avavar.velocity.x=0;console.log('trên');}
		if(event.which==40) {avavar.velocity.y = 2;avavar.velocity.x=0; console.log('dưới');}
		if(event.which==39) {avavar.velocity.x = 2;avavar.velocity.y=0;console.log('phải');}
		
	});

},false)