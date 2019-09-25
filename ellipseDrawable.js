'use strict';

import Drawable from './drawable.js'
import { Rect } from './coreTypes.js';

export default class Ellipse extends Drawable {

    /**
     * 
     * @param {Rect} rect 
     */
    constructor( rect ){
        super( rect );
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
        ctx.ellipse( this.rect.midX, this.rect.midY,
            this.rect.width / 2.0, this.rect.height / 2.0, 
            0, 0, 2.0 * Math.PI );

        // Fill
        if( this.fillStyle ){
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        // Stroke
        if( this.strokeStyle ){
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }

        ctx.restore();
    }

}