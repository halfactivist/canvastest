'use strict';

import {Point,Rect} from './coreTypes.js'
import Drawable from './drawable.js'
import Ellipse from './ellipseDrawable.js'
import CanvasDrawableManager from './canvasDrawableManager.js'
import BezierInterpolator from './bezierInterpolator.js'

var canvas = null;

var drawables = [];

/** @type {CanvasDrawableManager} */
var cdm = null;

export function init()
{
    canvas = document.getElementById('canvas');
    cdm = new CanvasDrawableManager( canvas );

    canvas.addEventListener( 'mousedown', onMouseDownHandler, false );
}

export function createObjects(){
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
        fillStyle: '#000000'
    };

    drawables = [];

    for( var row = 0; row < rows; row++ ){

        var red = Math.floor(row * (255 / (rows - 1)));

        for( var col = 0; col < columns; col++ ){

            var rect = new Rect( col * (rectWidth + spacing),
                                 row * (rectHeight + spacing),
                                 rectWidth,
                                 rectHeight );

            var aDrawable = new Ellipse( rect );

            
            var blue = Math.floor(col * (255 / (columns - 1)));
            aDrawable.fillStyle = 'rgb(' + red + ',255,' + blue + ')';
            aDrawable.strokeStyle = `rgb(${255 - red},0,${255-blue})`;

            drawables.push(aDrawable);
            cdm.addObject( aDrawable );
        }
    }
}

export function clearObjects()
{
    drawables.forEach( (drawable) => { cdm.removeObject(drawable); } );
    drawables = [];
}

export function redraw()
{
	var width = cdm.ctx.canvas.width;
    var height = cdm.ctx.canvas.height;
    
    cdm.updateRect( new Rect( 0, 0, width, height ) );
}

var wiggleTimerID = null;
export function toggleWiggle()
{
    if( !wiggleTimerID ){
        wiggleTimerID = setInterval( () => {
            var dX = -2.0 + Math.round( Math.random() * 4.0 );
            var dY = -2.0 + Math.round( Math.random() * 4.0 );

            var idx = Math.floor(drawables.length / 2);
            var drawable = drawables[idx];


            drawable.rect = drawable.rect.moveBy( dX, dY );

        }, 50 );
    }
    else{
        clearInterval( wiggleTimerID );
        wiggleTimerID = null;
    }
}

var randomColorsTimerID = null;
export function randomColors()
{
    if( !randomColorsTimerID ){
        randomColorsTimerID = setInterval( () => {
            var idx = Math.round( Math.random() * drawables.length );
            var drawable = drawables[idx];

            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);

            drawable.fillStyle = `rgb(${r},${g},${b})`;

        }, 10 );
    }
    else{
        clearInterval( randomColorsTimerID );
        randomColorsTimerID = null;
    }
}

var randomInsetTimerID = null;
export function randomInset()
{
    if( !randomInsetTimerID ){
        randomInsetTimerID = setInterval( () => {
            var idx = Math.round( Math.random() * drawables.length );
            var drawable = drawables[idx];
            drawable.rect = drawable.rect.insetBy( (Math.random() * 4.0) - 2.0 );

        }, 10 );
    }
    else{
        clearInterval( randomInsetTimerID );
        randomInsetTimerID = null;
    }
}

var _followMouseState = false;
export function toggleFollowMouse()
{
    if( !_followMouseState ){
        _followMouseState = true;
        canvas.addEventListener( 'mousemove', followMouseEventHandler, false );
    }
    else{
        _followMouseState = false;
        canvas.removeEventListener( 'mousemove', followMouseEventHandler );
    }

}

function followMouseEventHandler( evt ){
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

    var idx = drawables.length / 2;
    var drawable = drawables[idx];

    //cdm.updateRect( drawable.boundingRect );
    drawable.rect = new Rect( mousePos.x, mousePos.y, drawable.rect.width, drawable.rect.height );
    //cdm.updateRect( drawable.boundingRect );
}

function onMouseDownHandler( evt ){
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

    var drawable = cdm.hitObjectAtPoint( mousePos );
    console.log( "Hit object: " + drawable );
    drawable.fillStyle = "#FFFFFF";
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return new Point( evt.clientX - rect.left, evt.clientY - rect.top );
}


export function sendToBack(){
    var idx = drawables.length / 2;
    var drawable = drawables[idx];
    cdm.sendObjectToBack( drawable );
}

export function bringToFront(){
    var idx = drawables.length / 2;
    var drawable = drawables[idx];
    cdm.bringObjectToFront( drawable );
}

export function quadraticCurve()
{
    let dX = canvas.width;
    let dY = canvas.height;

    let p0 = new Point( 10, 10 );
    let p1 = new Point( Math.random() * dX, Math.random() * dY );
    let p2 = new Point( 1010, 10 );

    var points = BezierInterpolator.quadratic( p0, p1, p2 );

    /** @type {CanvasRenderingContext2D} */
    var ctx = cdm.ctx;
    ctx.clearRect( 0, 0, dX, dY );
    pieceWiseStroke( ctx, [p0, p1, p2], 'rgb(255,0,0)' );
    pieceWiseStroke( ctx, points, 'rgb(0,255,0)' );

}

export function cubicCurve()
{
    let p0 = new Point( 10, 350 );
    let p3 = new Point( 1010, 350 );

    let dX = canvas.width;
    let dY = canvas.height;

    let p1 = new Point( Math.random() * dX, Math.random() * dY );
    let p2 = new Point( Math.random() * dX, Math.random() * dY );

    var points = BezierInterpolator.cubic( p0, p1, p2, p3 );

    /** @type {CanvasRenderingContext2D} */
    var ctx = cdm.ctx;
    ctx.clearRect( 0, 0, dX, dY );
    pieceWiseStroke( ctx, [p0, p1, p2, p3], 'rgb(255,0,0)' );
    pieceWiseStroke( ctx, points, 'rgb(0,255,0)' );

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

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Array<Point>} points 
 * @param {*} strokeStyle 
 */
function pieceWiseStroke( ctx, points, strokeStyle )
{
    ctx.save();
    
    ctx.beginPath();

    ctx.moveTo( points[0].x, points[0].y );
    for( var i = 1; i < points.length; i++ ){
        var p = points[i];
        ctx.lineTo( p.x, p.y);
    }

    ctx.strokeStyle = strokeStyle;
    ctx.stroke();

    ctx.restore();
}