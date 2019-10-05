'use strict';

import { Point } from './coreTypes.js';

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
     * Returns a linear number interpolator
     * @param {Number} from 
     * @param {Number} to 
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
     */
    static LinearPointInterpolator( from, to ){
        return new Interpolator( from, to, 
            ( s, obj ) => {
                return new Point( obj._from.x + (obj._to.x - obj._from.x) * s,
                obj._from.y + (obj._to.y - obj._from.y) * s );
            } );
    }
}