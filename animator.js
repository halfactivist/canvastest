'use strict';

import Interpolator from './interpolator.js';

/**
 * Timer resolution in milliseconds
 * @type {Number}
 */
const Animator_RESOLUTION_MS = 40;

export default class Animator {

    constructor( property, target, from, to, duration = 1000, loop = false, reverse = false ){
        this._target = target;
        this._property = property;
        this._startValue = from;
        this._targetValue = to;
        this._duration = duration;
        this._loop = loop;
        this._reverse = reverse;
        this._interpolatorBuilderFunc = Interpolator.Linear;
        this._onStart = ( /** @type {Animator} */ a) => {};
        this._onStop = ( /** @type {Animator} */ a) => {};
        this._onDone = ( /** @type {Animator} */ a) => {};

        /* INTERNAL */
        this.__internal_timerID = undefined;
        this.__internal_interpolator = undefined;
        this.__internal_step = 0;
        this.__internal_increment = 0;
    }

    /**
     * The target object
     * @returns {*}
     */
    get target(){
        return this._target;
    }

    /**
     * The property to animate
     * @returns {string}
     */
    get property(){
        return this._property;
    }

    /**
     * The start value
     * @returns {*}
     */
    get startValue(){
        return this._startValue;
    }

    /**
     * The target value
     * @returns {*}
     */
    get targetValue(){
        return this._targetValue;
    }

    /**
     * Duration in milliseconds. Defaults to 1000
     * @returns {Number}
     */
    get duration(){ 
        return this._duration;
    }

    set duration( v ){
        this._duration = v;
    }

    /**
     * Wether the animation loops or not
     * @returns {boolean}
     */
    get loop(){
        return this._loop;
    }

    set loop( l ){
        this._loop = l;
    }

    /**
     * Wether the animation reverses or not
     * @returns {boolean}
     */
    get reverse(){
        return this._reverse;
    }

    set reverse( r ){
        this._reverse = r;
    }
    
    /**
     * The onStart callback
     * @returns {(a: Animator) => void}
     */
    get onStart(){
        return this._onStart;
    }

    set onStart( cb ){
        this._onStart = cb;
    }

    /**
     * The onStop callback
     * @returns {(a: Animator) => void}
     */
    get onStop(){
        return this._onStop;
    }

    set onStop( cb ){
        this._onStop = cb;
    }

    /**
     * The onDone callback
     * @returns {(a: Animator) => void}
     */
    get onDone(){
        return this._onDone;
    }

    set onDone( cb ){
        this._onDone = cb;
    }

    /*
     Fluent API
     */

    /**
     * The property to animate
     * @param {string} property 
     * @returns {Animator}
     */
    static animate( property ){
        return new Animator( property );
    }

    /**
     * Sets the target object
     * @param {*} target 
     * @returns {Animator}
     */
    of( target ){
        this._target = target;
        return this;
    }

    /**
     * Sets the start value
     * @param {*} from 
     * @returns {Animator}
     */
    from( from ){
        this._startValue = from;
        return this;
    }

    /**
     * Sets the target value
     * @param {*} to 
     * @returns {Animator}
     */
    to( to ){
        this._targetValue = to;
        return this;
    }

    /**
     * Sets the Interpolator Builder to use
     * @param {(f:*,t:*)=>Interpolator} interpolatorBuilderFunc 
     * @returns {Animator}
     */
    using( interpolatorBuilderFunc ){
        this._interpolatorBuilderFunc = interpolatorBuilderFunc;
        return this;
    }

    /**
     * Starts the animator
     * @returns {Animator}
     */
    start(){
        this.__internal_increment = Animator_RESOLUTION_MS / this.duration;
        this.__internal_interpolator = this._interpolatorBuilderFunc( this.startValue, this.targetValue );

        this.__restartTimer();

        return this;
    }

    /**
     * Stops the animator
     * @returns {Animator}
     */
    stop(){
        this.__stopTimer();

        if( this.onStop ){
            this.onStop( this );
        }

        return this;
    }


    /**
     * Resets the animator
     * @returns {Animator}
     */
    reset(){
        this.__internal_step = 0;
        this.__restartTimer();
        return this;
    }

    /* INTERNAL */

    __restartTimer(){
        this.__stopTimer();
        this.__internal_timerID = setInterval( () => {
            this.__performAnimation();
        }, Animator_RESOLUTION_MS );
    }

    __stopTimer(){
        if( this.__internal_timerID ){
            clearInterval( this.__internal_timerID );
            this.__internal_timerID = undefined;
        }
    }

    __performAnimation(){
        this.__internal_step += this.__internal_increment; 
        this._target[this._property] = this.__internal_interpolator.valueAt( this.__internal_step );
    }
}
