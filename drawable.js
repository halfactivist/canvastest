'use strict';

import {Point, Rect} from './coreTypes.js'
import CanvasDrawableManager from './canvasDrawableManager.js'

export default class Drawable {
    /**
     * 
     * @param {Rect} rect 
     */
    constructor( rect ){
        this._rect = rect;
        this._fillStyle = '#FFFFFFFF';
        this._strokeStyle = '#OOOOOOFF'
        this._lineWidth = 1;
        this._drawableManager = null;

        this._updateRect = null;
        this._updateOpCount = 0;
    }

    /**
     * @param {CanvasDrawableManager} cdm
     */
    set drawableManager( cdm ){
        this._drawableManager = cdm;
    }

    /**
     * @returns {CanvasDrawableManager}
     */
    get drawableManager() {
        return this._drawableManager;
    }

    set rect( r ){
        this.startUpdate();
        
        this._rect = r;
        
        this.commitUpdate();
    }

    /**
     * @returns {Rect}
     */
    get rect(){
        return this._rect;
    }

    set fillStyle( fillStyle ){

        this.startUpdate();

        this._fillStyle = fillStyle;
        
        this.commitUpdate();
    }

    get fillStyle(){
        return this._fillStyle;
    }

    set strokeStyle( strokeStyle ){

        this.startUpdate();

        this._strokeStyle = strokeStyle;
        
        this.commitUpdate();
    }

    get strokeStyle(){
        return this._strokeStyle;
    }

    set lineWidth( lineWidth ){

        this.startUpdate();

        this._lineWidth = lineWidth;
        
        this.commitUpdate();
    }

    get lineWidth(){
        return this._lineWidth;
    }

    /**
     * Gets the bounding rect of this drawable. That is the rectngle within which
     * all drawings operations of this object take place.
     * TODO: This default implementation should be cached to prevent creating Rect
     * instances at each call
     * @returns {Rect} The bounding rect of this Drawable
     */
    get boundingRect(){
        // Enlarge the rectangle so as to make it encompass the drawing of the border
        // The stroke middle is placed right on the path. Therefore it spills equally on both
        // sides of the path, hence the size increase.
        return this.rect.insetBy( -this.lineWidth );
    }

    /**
     * Test whether the object is hit by this point
     * The default implementation only tests the bounding rect
     * @param {Point} point 
     * @returns {Boolean} true if hit, false otherwise
     */
    hitTest( point ){
        return this.boundingRect.containsPoint( point );
    }

    /**
     * Marks the start of a set of operation requiring update
     * Actually, only marks the current BB for update
     */
    startUpdate()
    {
        if( this._updateOpCount === 0 && this._drawableManager ){
            this._drawableManager.updateRect( this.boundingRect );
        }
        this._updateOpCount++;
    }

    /**
     * Marks the end of a set of operation requiring update
     * Actually, only marks the current BB for update
     */
    commitUpdate()
    {
        this._updateOpCount = this._updateOpCount > 0 ? this._updateOpCount - 1 : 0;
        if( this._updateOpCount === 0 && this._drawableManager ){
            this._drawableManager.updateRect( this.boundingRect );
        }
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
        ctx.rect( this.rect.left, this.rect.top, this.rect.width, this.rect.height );

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