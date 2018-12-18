'use strict';

class Drawable {
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
        // Previous rect
        if( this._drawableManager ){ this._drawableManager.updateRect( this.boundingRect ); }
        this._rect = r;
        // New rect
        if( this._drawableManager ){ this._drawableManager.updateRect( this.boundingRect ); }
    }

    get rect(){
        return this._rect;
    }

    set fillStyle( fillStyle ){
        this._fillStyle = fillStyle;
        if( this._drawableManager ){ this._drawableManager.updateRect( this.boundingRect ); }
    }

    get fillStyle(){
        return this._fillStyle;
    }

    set strokeStyle( strokeStyle ){
        this._strokeStyle = strokeStyle;
        if( this._drawableManager ){ this._drawableManager.updateRect( this.boundingRect ); }
    }

    get strokeStyle(){
        return this._strokeStyle;
    }

    set lineWidth( lineWidth ){
        this.lineWidth = lineWidth;
        if( this._drawableManager ){ this._drawableManager.updateRect( this.boundingRect ); }
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
     * 
     * @param {CanvasRenderingContext2D} ctx The context being redrawn
     * @param {Rect} updateRect The rectangle area being redrawn
     */
    draw( ctx, updateRect ){

        if( !updateRect.intersects(this.boundingRect) ){
            // Nothing to draw
            return;
        }

        ctx.lineWidth = this.lineWidth;
        
        // Fill
        if( this.fillStyle ){
            ctx.fillStyle = this.fillStyle;
            ctx.fillRect( this.rect.left, this.rect.top, this.rect.width, this.rect.height );
        }
        // Stroke
        if( this.strokeStyle ){
            ctx.strokeStyle = this.strokeStyle;
            ctx.strokeRect( this.rect.left, this.rect.top, this.rect.width, this.rect.height );
        }
    }
}