var canvas = null;
var ctx = null;

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d', { alpha: false } );
    if( !ctx ){
        console.error( 'Canvas unsupported.' );
        return;
    }
}

function clearCanvas()
{
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    
    // Clear canvas
    ctx.clearRect( 0, 0, width, height );
    /*ctx.fillStyle = '#000000';
    ctx.fillRect( 0, 0, width, height );*/
}

function redraw()
{
	clearCanvas();
    
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var rectWidth = 8;
    var rectHeight = 8;
    var spacing = 4;

    var columns = Math.floor(width / (rectWidth + spacing));
    var rows = Math.floor(height / (rectHeight + spacing));

    // Set fill color & fillRect
    var rectParams = {
        x: 0, y: 0, width: rectWidth, height: rectHeight,
        fillStyle: '#FF0000'
    };

    for( var row = 0; row < rows; row++ ){
        for( var col = 0; col < columns; col++ ){
            rectParams.x = col * (rectWidth + spacing);
            rectParams.y = row * (rectHeight + spacing);
            var red = Math.floor(row * (255 / (rows - 1)));
            var blue = Math.floor(col * (255 / (columns - 1)));
            rectParams.fillStyle = 'rgb(' + red + ',255,' + blue + ')';
            pathLessFillRect( ctx, rectParams );
        }
    }
    
}

/**
 * @ctx: Canvas context
 * @attibutes: Object cotaining the attributes
 */
function pathLessFillRect( ctx, attributes )
{
	var a = attributes;
	ctx.fillStyle = a.fillStyle;
    ctx.fillRect( a.x, a.y, a.width, a.height );
}