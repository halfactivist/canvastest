'use strict';

import { Point, Rect } from './coreTypes.js';

export default class Interpolator {
    /**
     * 
     * @param {*} from 
     * @param {*} to 
     * @param {(s: Number, obj: Interpolator) => *} evaluator
     */
    constructor( from, to, evaluator ){
        this._from = from;
        this._to = to;
        this._evaluator = evaluator;
    }

    /**
     * 
     * @param {Number} step in range O..1
     * @returns {*}
     */
    valueAt( step ){
        return this._evaluator(step, this);
    }

    /**
     * Returns a linear interpolator of the correct type
     * @param {Number|Rect|Point} from 
     * @param {Number|Rect|Point} to 
     * @returns {Interpolator}
     */
    static Linear( from, to ){
        if( typeof from === 'number' && typeof to === 'number' ){
            return this.LinearNumberInterpolator( from, to );
        }
        else if( typeof from === 'object' && typeof to === 'object' ){
            if( from instanceof Point && to instanceof Point ){
                return this.LinearPointInterpolator( from, to );
            }
            else if( from instanceof Rect && to instanceof Rect ){
                return this.LinearRectInterpolator( from, to );
            }
        }

        throw new Error( 'Unhandled types' );
    }

    /**
     * Returns a linear number interpolator
     * @param {Number} from 
     * @param {Number} to 
     * @returns {Interpolator}
     */
    static LinearNumberInterpolator( from, to ){
        return new Interpolator( from, to, 
            ( s, obj ) => {
                return obj._from + (obj._to - obj._from) * s;
            } );
    }

    /**
     * Returns a linear point interpolator
     * @param {Point} from 
     * @param {Point} to 
     * @returns {Interpolator}
     */
    static LinearPointInterpolator( from, to ){
        return new Interpolator( from, to, 
            ( s, obj ) => {
                return new Point( obj._from.x + (obj._to.x - obj._from.x) * s,
                obj._from.y + (obj._to.y - obj._from.y) * s );
            } );
    }

    /**
     * Returns a linear rect interpolator
     * @param {Rect} from 
     * @param {Rect} to 
     * @returns {Interpolator}
     */
    static LinearRectInterpolator( from, to ){
        return new Interpolator( from, to, 
            ( s, obj ) => {
                return new Rect( 
                    obj._from.x + (obj._to.x - obj._from.x) * s,
                    obj._from.y + (obj._to.y - obj._from.y) * s,
                    obj._from.width + (obj._to.width - obj._from.width) * s,
                    obj._from.height + (obj._to.height - obj._from.height) * s );
            } );
    }
}