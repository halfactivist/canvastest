class CanvasDrawableManager {

	/**
	 * 
	 * @param {HTMLCanvasElement} canvasElement 
	 */
	constructor( canvasElement ){
		this._canvasElement = canvasElement;

		// Get canvas context from element
		this._canvasContext = canvasElement.getContext( '2d' );

		// The array that will store the managed objects
		this._objectArray = [];
		// A set used to check if objects are already stored
		this._objectSet = new Set();

		//
		// Update requests fields
		//
		this._animationFrameReqID = 0; // cf window.requestAnimationFrame()
		this._updateRect = null; // The rectangle to update
	}

	/**
	 * @returns {CanvasRenderingContext2D} The rendering context
	 */
	get ctx(){
		return this._canvasContext;
	}

	/**
	 * Adds an object to the 
	 * @param {Drawable} obj 
	 */
	addObject( obj ){
		if( this._objectSet.has( obj ) ){
			return;
		}
		this._objects.push( obj );
		this.updateRect( obj.boundingRect );
	}

	/**
	 * 
	 * @param {Drawable} obj
	 */
	removeObject( obj ){
		if( !this._objectSet.has( obj ) ){
			return;
		}
		this._objectSet.delete( obj );
		var idx = this._objectArray.indexOf( obj );
		if( idx < 0 ){
			console.warn( "Storage inconsistency.")
			return;
		}
		this._objectArray.splice( idx, 1 );
		this.updateRect( obj.boundingRect );
	}

	/**
	 * Marks a rectangular zone requires redraw
	 * @param {Rect} rect 
	 */
	updateRect( rect ){
		var _this = this;

		// Update the updateRect
		this._updateRect = (this._updateRect === null) ? rect : rect.union( this._updateRect );

		if( this._animationFrameReqID === 0 ){
			// No animation frame pending, do the request
			this._animationFrameReqID = window.requestAnimationFrame( (t) => { _this._redraw(t); } );
		}
		
	}

	/**
	 * Actually performs the redrawing of the concerned zone of the canvas
	 * @param {DOMHighResTimeStamp}
	 */
	_redraw( time ){
		// Clear animation frame request ID, thereby marking that the update is in progress
		this._animationFrameReqID = 0;
		var currentUpdateRect = this._updateRect;
		this._updateRect = null;

		var _this = this;

		this._objectArray.forEach( (aDrawable, index) => {
			if( aDrawable.boundingRect.intersects(currentUpdateRect) ){
				aDrawable.draw( _this.ctx, currentUpdateRect );
			}
		} ); 
	}
}