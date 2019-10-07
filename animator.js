'use strict';

/**
 * Timer resolution in milliseconds
 * @type {Number}
 */
const Animator_RESOLUTION_MS = 40;

export default class Animator {

    constructor( target, property, from, to, duration = 1000, loop = false, reverse = false ){
        this._duration = 1000;
        this._loop = false;
        this._reverse = false;
        this._onStart = ( /** @type {Animator} */ a) => {};
        this._onStop = ( /** @type {Animator} */ a) => {};
        this._onDone = ( /** @type {Animator} */ a) => {};
    }

    /**
     * Duration in milliseconds. Defaults to 1000
     * @returns {Number}
     */
    get duration(){ 
        return this._duration;
    }

    /**
     * 
     */
    set duration( v ){
        this._duration = v;
    }

    /**
     * Wether the animation loops or not
     */
    get loop(){
        return this._loop;
    }

    set loop( l ){
        this.loop = l;
    }

    /**
     * Starts the animator
     */
    start(){

    }

    /**
     * Stops the animator
     */
    stop(){

    }

    /**
     * Resets the animator
     */
    reset(){

    }

}

/**
 * Fluent API Animator Builder
 */
export class AnimatorBuilder {

    constructor(){}

    /**
     * The property to animate
     * @param {string} property 
     */
    animate( property ){
        this._property = property;
    }

    of( target ){
        this._target = target;
    }

    from( from ){
        this._from = from;
    }

    to( to ){
        this._to = to;
    }

    animator(){

    }

}