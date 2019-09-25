'use strict';

export class Point {

    /**
     * Dedicated initializer for Point
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor( x, y ){
        this._x = x;
        this._y = y;

        Object.freeze(this);
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    /**
     * Distance between two points
     * @param {Point} aPoint 
     * @returns {Number}
     */
    distanceToPoint( aPoint ){
        var dX = aPoint.x - this.x;
        var dY = aPoint.y - this.y;
        return Math.sqrt( dX * dX + dY * dY );
    }

    /**
     * Equality test
     * @param {Point} point
     * @return {Boolean}
     */
    equals( point ){
        return (this.x === point.x && this.y === point.y);
    }

    /**
     * @returns {Point}
     */
    copy(){
        return new Point( this.x, this.y );
    }

    /**
     * @returns {Point}
     */
    static Zero(){
        return new Point( 0, 0 );
    }
}

export class Rect {
    /**
     * Dedicated initializer for Rect
     * @param {Number} top
     * @param {Number} left 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor( left, top, width, height ){
        this._left = left;
        this._top = top;
        this._width = width;
        this._height = height;

        Object.freeze(this);
    }

    get left(){
        return this._left;
    }

    get minX(){
        return this._left;
    }

    get midX(){
        return this._left + this._width / 2.0;
    }

    get maxX(){
        return this._left + this._width;
    }

    get top(){
        return this._top;
    }

    get minY(){
        return this._top;
    }

    get midY(){
        return this._top + this._height / 2.0;
    }

    get maxY(){
        return this._top + this._height;
    }

    get topLeft(){
        return new Point( this.minX, this.minY );
    }

    get topRight(){
        return new Point( this.maxX, this.minY );
    }

    get bottomLeft(){
        return new Point( this.maxX, this.minY );
    }

    get bottomRight(){
        return new Point( this.maxX, this.maxY );
    }

    get center(){
        return new Point( this.midX, this.midY );
    }

    get width(){
        return this._width;
    }

    get height(){
        return this._height;
    }

    /**
     * Get an inset copy of this
     * @param {Number} inset The inset to apply to all edges
     * @return {Rect} a new Rect whose values are the reult of all edges of this being inset
     */
    insetBy( inset ){
        return new Rect( this.left + inset,
                         this.top + inset,
                         this.width - 2.0 * inset,
                         this.height - 2.0 * inset );
    }

    /**
     * Creates a rectangle with the same dimensions but moved by the given amount
     * along the X and Y axis.
     * @param {Number} dX delta X
     * @param {Number} dY delta Y
     */
    moveBy( dX, dY ){
        return new Rect( this.left + dX, this.top + dY, this.width, this.height );
    }

    /**
     * Tests whether this Rect contains the given point (x, y)
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean}
     */
    containsPointXY( x, y ){
        return (x >= this.minX && x < this.maxX && y >= this.minY && y < this.maxY) ? true : false;        
    }

    /**
     * Tests whether this Rect contains the given Point p
     * @param {Point} p 
     */
    containsPoint( p ){
        return this.containsPointXY( p.x, p.y );
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
        var minX = Math.max( this.minX, rect.minX );
        var maxX = Math.min( this.maxX, rect.maxX );
        var minY = Math.max( this.minY, rect.minY );
        var maxY = Math.min( this.maxY, rect.maxY );
        var width = maxX - minX;
        var height = maxY - minY;

        if( width < 0 || height < 0 ){
            return false;
        }
        return true;
    }

    /**
     * Returns the intersection of this and another rectangle
     * @param {Rect} rect 
     * @returns {Rect}  The intersection rectangle or null if they don't intersect
     */
    intersection( rect ){
        var minX = Math.max( this.minX, rect.minX );
        var maxX = Math.min( this.maxX, rect.maxX );
        var minY = Math.max( this.minY, rect.minY );
        var maxY = Math.min( this.maxY, rect.maxY );
        var width = maxX - minX;
        var height = maxY - minY;

        if( width < 0 || height < 0 ){
            return null;
        }

        return new Rect( minX, minY, width, height );
    }

    /**
     * Returns the union rectangle containing this and another rect
     * @param {Rect} rect The union of both rectangles
     */
    union( rect ){
        var minX = Math.min( this.minX, rect.minX );
        var maxX = Math.max( this.maxX, rect.maxX );
        var minY = Math.min( this.minY, rect.minY );
        var maxY = Math.max( this.maxY, rect.maxY );
        var width = maxX - minX;
        var height = maxY - minY;

        return new Rect( minX, minY, width, height );
    }

    /**
     * Equality test
     * @param {Rect} rect 
     * @returns {Boolean}
     */
    equals( rect ){
        return (this.top === rect.top 
                && this.left === rect.left
                && this.width === rect.width
                && this.height === rect.height);
    }

    /**
     * @returns {Rect} a new Rect with the values of this object
     */
    copy(){
        return new Rect( this.left, this.top, this.width, this.height );
    }

    toString(){
        return "{ "
            + "left: " + this.left
            + ", top: " + this.top
            + ", width: " + this.width
            + ", height: " + this.height
            + " }"; 
    }
    /**
     * Creates a new Rect whose origin and size are 0
     * @returns {Rect} Zero Rect
     */
    static Zero()
    {
        return new Rect( 0, 0, 0, 0 );
    }

    /**
     * Creates a Rect whose origin is at (-INF, -INF) & size (+INF, +INF)
     * @returns {Rect} Inifinte Rect
     */
    static Infinite()
    {
        return new Rect( Number.NEGATIVE_INFINITY, 
                         Number.NEGATIVE_INFINITY,
                         Number.POSITIVE_INFINITY,
                         Number.POSITIVE_INFINITY );
    }
}

