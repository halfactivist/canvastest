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
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw( ctx ){
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