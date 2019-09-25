'use strict';

import Drawable from './drawable.js'
import {Point,Rect} from './coreTypes.js'

export default class CanvasDrawableManager {

	/**
	 * 
	 * @param {HTMLCanvasElement} canvasElement 
	 */
	constructor( canvasElement ){
		this._canvasElement = canvasElement;

		// Get canvas context from element
		this._canvasContext = canvasElement.getContext( '2d' );
		if( !this._canvasContext ){
			throw "Canvas not supported."
		}

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
	 * Adds an object to the set of managed objects
	 * @param {Drawable} obj 
	 */
	addObject( obj ){
		if( this._objectSet.has( obj ) ){
			return;
		}
		obj.drawableManager = this;
		this._objectSet.add( obj );
		this._objectArray.push( obj );
		this.updateRect( obj.boundingRect );
	}

	/**
	 * Removes an object from the managed set
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
		obj.drawableManager = null;
		this.updateRect( obj.boundingRect );
	}

	/**
	 * Gets the index (back to front) of a managed object
	 * @param {Drawable} obj 
	 * @returns {Number} The index of the object, -1 if not present
	 */
	indexOfObject( obj ){
		return this._objectArray.indexOf( obj );
	}

	/**
	 * Moves a drawable object in the stack
	 * @param {Drawable} obj 
	 * @param {Number} index 
	 */
	moveObjectTo( obj, index ){
		if( !this._objectSet.has( obj ) ){
			return;
		}

		if( index < 0 || index > this._objectArray.length ){
			throw "Invalid index: " + index;
		}

		var currentIndex = this.indexOfObject( obj );
		if( currentIndex === index ){
			// Nothing to do
			return;
		}

		// Temporarily remove the object
		this._objectArray.splice( currentIndex, 1 );

		// Insert back
		this._objectArray.splice( index, 0, obj );

		// Update 
		this.updateRect( obj.boundingRect );
	}

	/**
	 * Sends an object to the start of the drawing list
	 * @param {Drawable} obj 
	 */
	sendObjectToBack( obj ){
		this.moveObjectTo( obj, 0 );
	}

	/**
	 * Moves a drawable to the end of the drawing list
	 * @param {Drawable} obj 
	 */
	bringObjectToFront( obj ){
		this.moveObjectTo( obj, this._objectArray.length );
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
	 * Gets the top most drawable responding positively to hitTest
	 * @param {Point} point 
	 * @returns {Drawable} The front most hit drawable, null if none
	 */
	hitObjectAtPoint( point ){
		for( var index = this._objectArray.length - 1; index >= 0; index-- ){
			var aDrawable = this._objectArray[index];
			if( aDrawable.hitTest( point ) ){
				return aDrawable;
			}
		}

		return null;
	}

	/**
	 * Actually performs the redrawing of the concerned zone of the canvas
	 * @param {DOMHighResTimeStamp}
	 */
	_redraw( time ){

		console.log( "_redraw(): updateRect = " + this._updateRect );

		// Clear animation frame request ID, thereby marking that the update is in progress
		this._animationFrameReqID = 0;
		var currentUpdateRect = this._updateRect;
		this._updateRect = null;

		var _this = this;

		this.ctx.clearRect( currentUpdateRect.left, 
			currentUpdateRect.top,
			currentUpdateRect.width,
			currentUpdateRect.height );

		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect( currentUpdateRect.left, currentUpdateRect.top, currentUpdateRect.width, currentUpdateRect.height );

		

		this._objectArray.forEach( (aDrawable, index) => {
			if( aDrawable.boundingRect.intersects(currentUpdateRect) ){
				aDrawable.draw( _this.ctx, currentUpdateRect );
			}
		} ); 
	}
}