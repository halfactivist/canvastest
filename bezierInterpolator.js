'use strict';

import {Point} from './coreTypes.js'

const INTERPOLATION_STEPS = 20;

export default class BezierInterpolator {

    /**
     * Interpolates a quadractic curve
     * @param {Point} p0 Start point
     * @param {Point} p1 Control point
     * @param {Point} p2 End point
     * @returns {Array<Point>}
     */
    static quadratic( p0, p1, p2 )
    {
        /** @type {Array<Point>} */
        let retVal = [];

        for( var i = 0; i <= INTERPOLATION_STEPS; i++ ){
            let t = i / INTERPOLATION_STEPS;
            let _t2 = t * t;
            let _2t = t + t;
            let _1_t2 = 1 - _2t + _t2;
            let _2l1_tlt = _2t - 2 * _t2;

            retVal.push( new Point(
                _1_t2 * p0.x + _2l1_tlt * p1.x + _t2 * p2.x,
                _1_t2 * p0.y + _2l1_tlt * p1.y + _t2 * p2.y,
            ) )
        }

        return retVal;
    }

    /**
     * 
     * @param {*} p1 
     * @param {*} p0 
     * @param {*} p2 
     * @param {*} p3 
     */
    static cubic( p0, p1, p2, p3 )
    {

    }

}