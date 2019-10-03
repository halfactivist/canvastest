'use strict';

import {Point} from './coreTypes.js'

const INTERPOLATION_STEPS = 20;

export default class BezierInterpolator {

    /**
     * Interpolates a curve
     * @param {Array<Point>} points 
     */
    static interpolate( points ){
        if()
    }

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
     * Interpolates a cubic curve
     * @param {Point} p1 Start point
     * @param {Point} p0 Control point 1
     * @param {Point} p2 Control point 2
     * @param {Point} p3 End point
     * @returns {Array<Point>}
     */
    static cubic( p0, p1, p2, p3 )
    {
        /** @type {Array<Point>} */
        let retVal = [];

        for( var i = 0; i <= INTERPOLATION_STEPS; i++ ){
            let t = i / INTERPOLATION_STEPS;
            let _t2 = t * t;
            let _t3 = _t2 * t;

            // (1 - t)
            let _1_t = 1.0 - t;
            // (1 - t)^2
            let _1_t2 = _1_t * _1_t;
            // (1 - t)^3
            let _1_t3 = _1_t2 * _1_t;

            // 3 * t * (1-t)^2
            let _3tl_1_t2l = 3.0 * t * _1_t2;

            // 3 * t^2 * (1-t)
            let _3t2l_1_tl = 3.0 * _t2 * _1_t;

            retVal.push( new Point(
                _1_t3 * p0.x + _3tl_1_t2l * p1.x + _3t2l_1_tl * p2.x + _t3 * p3.x,
                _1_t3 * p0.y + _3tl_1_t2l * p1.y + _3t2l_1_tl * p2.y + _t3 * p3.y,
            ) )
        }

        return retVal;
    }

}