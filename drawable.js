class Drawable {
    /**
     * 
     * @param {Rect} rect 
     */
    constructor( rect ){
        this.rect = rect;
        this.fillStyle = '#FFFFFFFF';
        this.strokeStyle = '#OOOOOOFF'
        this.lineWidth = 1;
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