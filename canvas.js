var canvas = null;

var drawables = [];

var cdm = null;

function init()
{
    canvas = document.getElementById('canvas');
    cdm = new CanvasDrawableManager( canvas );
}

function createObjects(){
    var width = canvas.width;
    var height = canvas.height;

    var rectWidth = 40;
    var rectHeight = 40;
    var spacing = 4;

    var columns = Math.floor(width / (rectWidth + spacing));
    var rows = Math.floor(height / (rectHeight + spacing));

    // Set fill color & fillRect
    var rectParams = {
        x: 0, y: 0, width: rectWidth, height: rectHeight,
        fillStyle: '#FF0000'
    };

    drawables = [];

    for( var row = 0; row < rows; row++ ){

        var red = Math.floor(row * (255 / (rows - 1)));

        for( var col = 0; col < columns; col++ ){

            var rect = new Rect( col * (rectWidth + spacing),
                                 row * (rectHeight + spacing),
                                 rectWidth,
                                 rectHeight );

            var aDrawable = new Drawable( rect );

            
            var blue = Math.floor(col * (255 / (columns - 1)));
            aDrawable.fillStyle = 'rgb(' + red + ',255,' + blue + ')';

            drawables.push(aDrawable);
            cdm.addObject( aDrawable );
        }
    }
}

function clearObjects()
{
    drawables.forEach( (drawable) => { cdm.removeObject(drawable); } );
    drawables = [];
}

function redraw()
{
	var width = cdm.ctx.canvas.width;
    var height = cdm.ctx.canvas.height;
    
    cdm.updateRect( new Rect( 0, 0, width, height ) );
}

var wiggleTimerID = null;
function toggleWiggle()
{
    if( !wiggleTimerID ){
        wiggleTimerID = setInterval( () => {
            var dX = -2.0 + Math.round( Math.random() * 4.0 );
            var dY = -2.0 + Math.round( Math.random() * 4.0 );

            var idx = drawables.length / 2;
            var drawable = drawables[idx];

            //var prevBB = drawable.boundingRect;
            cdm.updateRect( drawable.boundingRect );
            drawable.rect.top += dY;
            drawable.rect.left += dX;
            cdm.updateRect( drawable.boundingRect );

            //drawables.forEach( (d) => { d.rect.top += dY; d.rect.left += dX; } );
            //redraw();
        }, 50 );
    }
    else{
        clearInterval( wiggleTimerID );
        wiggleTimerID = null;
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