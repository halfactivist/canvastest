class Rect {
    /**
     * Dedicated initializer for Rect
     * @param {Number} top
     * @param {Number} left 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor( left, top, width, height ){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    get minX(){
        return this.left;
    }

    get maxX(){
        return this.left + this.width;
    }

    get minY(){
        return this.top;
    }

    get maxY(){
        return this.top + this.height;
    }

    /**
     * Tests whether this Rect contains the given point (x, y)
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean}
     */
    containsPoint( x, y ){
        return (x >= this.minX && x < this.maxX && y >= this.minY && y < this.maxY) ? true : false;        
    }

    /**
     * 
     * @param {Rect} rect 
     * @returns {Boolean}
     */
    containsRect( rect ){
        var retVal = this.containsPoint( rect.minX, rect.minY )    // Top left
                    && this.containsPoint( rect.minX, rect.maxY )  // Bottom left
                    && this.containsPoint( rect.maxX, rect.minY )  // Top right
                    && this.containsPoint( rect.maxX, rect.maxY ); // Bottom right
        return retVal;
    }

    /**
     * Tests whether this and another rectangle are intersecting or not.
     * @param {Rect} rect 
     * @returns {Boolean}
     */
    intersects( rect ) {
        
    }
}