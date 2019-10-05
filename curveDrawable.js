'use strict';

import Drawable from './drawable.js'
import { Point, Rect } from './coreTypes.js';
import BezierInterpolator from './bezierInterpolator.js';

export default class Curve extends Drawable {

    /**
     * 
     * @param {Array<Point>} points 
     */
    constructor( points ){
        super( Rect.Zero() );
        this._controlBox = Rect.Zero();
        this.points = points;
    }

    /**
     * @param {Array<Point>} points
     */
    set points( points ){
        this.startUpdate();
        this._points = points;
        this._controlBox = Rect.BoundingRect( points );
        this.rect = this._controlBox;
        this.commitUpdate();
    }

    /**
     * @returns {Array<Point>}
     */
    get points(){
        return this._points;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx The context being redrawn
     * @param {Rect} updateRect The rectangle area being redrawn
     */
    draw( ctx, updateRect ){

        if( !updateRect.intersects(this.boundingRect) ){
            // Nothing to draw
            return;
        }

        ctx.save();

        ctx.lineWidth = this.lineWidth;
        
        ctx.beginPath();
        
        if( this.points.length === 2 ){
            ctx.moveTo( this.points[0].x, this.points[0].y );
            ctx.lineTo( this.points[1].x, this.points[1].y );
        }
        else if( this.points === 3 ){
            ctx.moveTo( this.points[0].x, this.points[0].y );
            ctx.quadraticCurveTo( 
                this.points[1].x, this.points[1].y,
                this.points[2].x, this.points[2].y );
        }
        else {
            ctx.moveTo( this.points[0].x, this.points[0].y );
            ctx.bezierCurveTo( 
                this.points[1].x, this.points[1].y,
                this.points[2].x, this.points[2].y,
                this.points[3].x, this.points[3].y );
        }

        // Stroke
        if( this.strokeStyle ){
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }

        ctx.restore();
    }

}