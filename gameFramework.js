//prototypes

Array.prototype.Remove = function(arg, all)
{
	for(var i =0; i < this.length; i++)
	{
		if(this[i] == arg)
		{
			this.splice(i, 1);
			if(all == null || !all)
				break;
			else 
				i--;
		}
	}
};

Array.prototype.RemoveAt = function(pos)
{
	this.splice(pos, 1);
};

Array.prototype.Clear = function()
{
	this.length = 0;
};

Array.prototype.InsertAt = function(arg, pos)
{
	var array1 = this.slice(0, pos);
	var array2 = this.slice(pos);
	
	this.Clear();
	
	for(var i = 0; i < array1.length; i++)
		this.push(array1[i]);
	
	this.push(arg);
	
	for(i = 0; i < array2.length; i++)
		this.push(array2[i]);
};

Array.prototype.Contains = function(arg)
{
	for(var i = 0; i < this.length; i++)
		if(this[i] == arg)
			return true;
	
	return false;
};

Array.prototype.Occurs = function(arg)
{
	var counter = 0;
	
	for(var i = 0; i < this.length; i++)
		if(this[i] == arg)
			counter++;
		
	return counter;
};

//Vector2

Vector2 = function(x, y)
{
	this.x = 0;
	this.y = 0;
	
	if(x != null && y == null)
	{
		this.x = x;
		this.y = x;
	}
	else
	{
		if(x != null)
			this.x = x;
		if(y != null)
			this.y = y;
	}
	
	this.previousX = 0;
	this.previousY = 0;
	
	this.Set = function(x, y)
	{
		if(x == null && y == null);
		else
		{
			this.previousY = this.y;
			this.previousX = this.x;
			
			if(x != null && y == null)
			{
				this.x = x;
				this.y = x;
			}
			else
			{
				if(x != null)
				{
					this.previousX = this.x;
					this.x = x;
				}
			
				if(y != null)
				{
					this.previousY = this.y;
					this.y = y;
				}
			}
		}
	};
	
	this.Move = function(vector2)
	{
		this.x += vector2.x;
		this.y += vector2.y;
	};
	
	this.Normalise = function()
	{
		var tmp = new Vector2(this.x, this.y);
		var mag = Math.sqrt((tmp.x * tmp.x) + (tmp.y * tmp.y));
		
		tmp.x = tmp.x / mag;
		tmp.y = tmp.y / mag;
		
		return tmp;
	};	
	
	this.Distance = function(vector2)
	{
		if(vector2 != null)
			return Math.sqrt(((this.x - vector2.x) * (this.x - vector2.x)) +
				            ((vector2.y - this.y) * (vector2.y - this.y)));
			else
				return Math.sqrt(((this.previousX - this.x) * (this.previousX - this.x)) +
				            ((this.previousY - this.y) * (this.previousY - this.y)));
	};
	
	this.HasChanged = function()
	{
		if(this.x != this.previousX || this.y != previousY)
			return true;
		else
			return false;
	};
	
	this.Difference = function(vector2, inverse)
	{
		var inv = 1;
		
		if(inverse)
			inv = -1;
		if(vector2 == null)
		{
			return new Vector2((this.x - this.previousX) * inv, (this.y - this.previousY) * inv);
		}
		else
		{
			return new Vector2((this.x - vector2.x) * inv, (this.y - vector2.y) * inv);
		}
	};
		
			
};

//Color

Color = function(r, g, b, a)
{
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 1;
	
	if(r != null)
		this.r = r;
	if(g != null)
		this.g = g;
	if(b != null)
		this.b = b;
	if(a != null)
		this.a = a;
	
	this.ToStandard = function(noAlpha)
	{
		if(noAlpha == null || !noAlpha)
			return "rgba(" + this.r + ", " + this.g + "," + this.b + ", " + this.a + ")";
		else
			return "rgb(" + this.r + ", " + this.g + "," + this.b + ")";
	};
}


//Rectangle

Rectangle = function(x, y, w, h)
{
	if(x == null || y == null || w == null || h == null)
	{
		alert("wrong parameters");
		
		var errormsg = "wrong parameters";
		
		throw new Error(errormsg);
	}
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.color = new Color();
	
	
	this.Intersects = function(shape)
	{
		var offset = 0;
		if(shape.radius != null)
			offset = shape.radius;
		
		if(this.Contains(shape.x - offset, shape.y - offset) ||
		   this.Contains(shape.x + shape.w - offset, shape.y - offset) ||
		   this.Contains(shape.x - offset, shape.y + this.h - offset) ||
		   this.Contains(shape.x + shape.h - offset, shape.y + shape.h - offset))
		   {
			   return true;
		   }
		else if(shape.Contains(this.x - offset, this.y - offset) ||
				shape.Contains(this.x + this.w - offset, this.y - offset) ||
				shape.Contains(this.x - offset, this.y + this.h - offset) ||
				shape.Contains(this.x + this.w - offset, this.y + this.h - offset))
				{
					return true;
				}
		return false;
	};
	this.Contains = function(x, y)
	{
		if(x >= this.x && x <= this.x + this.w &&
		   y >= this.y && y <= this.y + this.h)
		   {
			   return true;
		   }
		   else
		   {
			   return false;
		   }
	};
	
	this.Draw = function(ctx)
	{
		ctx.fillStyle = this.color.ToStandard();
		ctx.fillRect(this.x, this.y, this.w, this.h);
		
	};
	
	this.SetPosition = function(vector2)
	{
		this.x = vector2.x;
		this.y = vector2.y;
	}
};

//Circle

Circle = function(x, y, radius)
{
	if(x == null || y == null || radius == null)
	{
		alert("wrong parameters");
		
		var errormsg = "wrong parameters";
		
		throw new Error(errormsg);
	}
	
	this.x = x;
	this.y = y;
	this.radius = radius;
	
	this.color = new Color();
	
	
	this.Intersects = function(shape)
	{
		var offset = 0;
		if(shape.radius != null)
			offset = shape.radius;
		
		if(this.Contains(shape.x - offset, shape.y - offset) ||
		   this.Contains(shape.x + shape.w - offset, shape.y - offset) ||
		   this.Contains(shape.x - offset, shape.y + this.h - offset) ||
		   this.Contains(shape.x + shape.h - offset, shape.y + shape.h - offset))
		   {
			   return true;
		   }
		else if(shape.Contains(this.x - offset, this.y - offset) ||
				shape.Contains(this.x + this.radius - offset, this.y - offset) ||
				shape.Contains(this.x - offset, this.y + this.radius - offset) ||
				shape.Contains(this.x + this.radius - offset, this.y + this.radius - offset))
				{
					return true;
				}
		return false;
	};
	
	this.Contains = function(x, y)
	{
		if(x >= this.x && x <= this.x + this.w &&
		   y >= this.y && y <= this.y + this.h)
		   {
			   return true;
		   }
		   else
		   {
			   return false;
		   }
	};
	
	this.Draw = function(ctx)
	{
		ctx.fillStyle = this.color.ToStandard();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		
	};
	
	this.SetPosition = function(vector2)
	{
		this.x = vector2.x;
		this.y = vector2.y;
	}
};

//animation
Animation = function(width, height, row, column, limit, imgSrc, fps, columns, rows)
{
	if (fps == null || fps >= 33)
		this.fps = 1;
	else
		this.fps = 33 / fps;
	this.fpsCounter = 0;
	//this.frame = 0;
	this.width = width;
	this.height = height;
	this.rowStart = row;
	this.columnStart = column;
	this.row = row;
	this.column = column;
	this.rows = rows;
	this.columns = columns;
	if (limit == null || limit == 0)
		this.limit = 999999999999;
	else
		this.limit = limit - 1;
	this.limitCount = 0;
	this.image = new Image();
	this.image.src = imgSrc;
	this.position = new Vector2(0);
	this.cropPosition = new Vector2(0);
	
	this.SetLimit = function(limit)
	{
		this.limit = l - 1;
	};
	
	this.SetRow = function(num)
	{
		this.row = num;
		this.rowStart = num;
		
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
	};
	
	this.SetColumn = function(num)
	{
		this.column = num;
		this.columnStart = num;
		
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
	};
	
	this.Update = function()
	{
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
		
		if (this.columns == null || this.columns == 0)
			this.columns = this.image.width / this.width;
		if (this.rows == null || this.rows == 0)
			this.rows = this.image.height / this.height;
	};
	
	this.Draw = function(ctx)
	{
		if (this.fpsCounter == 0)
		{
			if (this.limitCount < this.limit)
			{
				this.limitCount++;
				this.column++;
				
				if (this.column >= this.columns)
				{
					this.row++;
					this.column = 0;
					
					if (this.row >= this.rows)
					{
						this.row = this.rowStart;
						this.column = this.columnStart;
						this.limitCount = 0;
					}
				}
			}
			else
			{
				this.column = this.columnStart
				this.row = this.rowStart;
				this.limitCount = 0;
			}
		}
		
		ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
		
		this.fpsCounter++;
		
		if (this.fpsCounter >= this.fps)
			this.fpsCounter = 0;
	};
};

Input = function()
{
	this.a = false;
	this.b = false;
	this.c = false;
	this.d = false;
	this.e = false;
	this.f = false;
	this.g = false;
	this.h = false;
	this.i = false;
	this.j = false;
	this.k = false;
	this.l = false;
	this.m = false;
	this.n = false;
	this.o = false;
	this.p = false;
	this.q = false;
	this.r = false;
	this.s = false;
	this.t = false;
	this.u = false;
	this.v = false;
	this.w = false;
	this.x = false;
	this.y = false;
	this.z = false;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.enter = false;
	this.space = false;
	this.mouseIsDown = false;
	this.mousePosition = new Vector2(0);
	this.offset = new Vector2(0);
	this.clamp = new Vector2(0);
};

var input = new Input();

document.documentElement.onmousemove = function(e)
{
	e = e || window.event;
	
	input.mousePosition.x = e.clientX - input.offset.x;
	input.mousePosition.y = e.clientY - input.offset.y;
};

document.documentElement.onmousedown = function(e)
{
	input.mouseIsDown = true;
};

document.documentElement.onmouseup = function(e)
{
	input.mouseIsDown = false;
};

document.documentElement.onkeydown = function(e)
{
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	
	switch (keycode)
	{
		case 13:
			input.enter = true;
			break;
		case 32:
			input.space = true;
			break;
		case 37:
			input.left = true;
			break;
		case 38:
			input.up = true;
			break;
		case 39:
			input.right = true;
			break;
		case 40:
			input.down = true;
			break;
		case 65:
			input.a = true;
			break;
		case 66:
			input.b = true;
			break;
		case 67:
			input.c = true;
			break;
		case 68:
			input.d = true;
			break;
		case 69:
			input.e = true;
			break;
		case 70:
			input.f = true;
			break;
		case 71:
			input.g = true;
			break;
		case 72:
			input.h = true;
			break;
		case 73:
			input.i = true;
			break;
		case 74:
			input.j = true;
			break;
		case 75:
			input.k = true;
			break;
		case 76:
			input.l = true;
			break;
		case 77:
			input.m = true;
			break;
		case 78:
			input.n = true;
			break;
		case 79:
			input.o = true;
			break;
		case 80:
			input.p = true;
			break;
		case 81:
			input.q = true;
			break;
		case 82:
			input.r = true;
			break;
		case 83:
			input.s = true;
			break;
		case 84:
			input.t = true;
			break;
		case 85:
			input.u = true;
			break;
		case 86:
			input.v = true;
			break;
		case 87:
			input.w = true;
			break;
		case 88:
			input.x = true;
			break;
		case 89:
			input.y = true;
			break;
		case 90:
			input.z = true;
			break;
	}
};

document.documentElement.onkeyup = function(e)
{
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	
	switch (keycode)
	{
		case 13:
			input.enter = false;
			break;
		case 32:
			input.space = false;
			break;
		case 37:
			input.left = false;
			break;
		case 38:
			input.up = false;
			break;
		case 39:
			input.right = false;
			break;
		case 40:
			input.down = false;
			break;
		case 65:
			input.a = false;
			break;
		case 66:
			input.b = false;
			break;
		case 67:
			input.c = false;
			break;
		case 68:
			input.d = false;
			break;
		case 69:
			input.e = false;
			break;
		case 70:
			input.f = false;
			break;
		case 71:
			input.g = false;
			break;
		case 72:
			input.h = false;
			break;
		case 73:
			input.i = false;
			break;
		case 74:
			input.j = false;
			break;
		case 75:
			input.k = false;
			break;
		case 76:
			input.l = false;
			break;
		case 77:
			input.m = false;
			break;
		case 78:
			input.n = false;
			break;
		case 79:
			input.o = false;
			break;
		case 80:
			input.p = false;
			break;
		case 81:
			input.q = false;
			break;
		case 82:
			input.r = false;
			break;
		case 83:
			input.s = false;
			break;
		case 84:
			input.t = false;
			break;
		case 85:
			input.u = false;
			break;
		case 86:
			input.v = false;
			break;
		case 87:
			input.w = false;
			break;
		case 88:
			input.x = false;
			break;
		case 89:
			input.y = false;
			break;
		case 90:
			input.z = false;
			break;
	}
};