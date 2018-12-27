/**
 * @was-flow
 * @file HOC to make responsive Box UI Elements
 * @author Box
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL, CLASS_IS_SMALL, CLASS_IS_TOUCH, CLASS_IS_MEDIUM } from '../constants';
const CROSS_OVER_WIDTH_SMALL = 700;
const CROSS_OVER_WIDTH_MEDIUM = 1000;
const HAS_TOUCH = !!('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch));
function makeResponsive(Wrapped) {
    var _a;
    return (_a = class extends React.PureComponent {
            /**
             * [constructor]
             *
             * @param {*} data
             * @return {void}
             */
            constructor(props) {
                super(props);
                /**
                 * Resizing function
                 *
                 * @private
                 * @param {Component} react component
                 * @return {void}
                 */
                this.onResize = debounce(({ bounds: { width } }) => {
                    this.setState({ size: this.getSize(width) });
                }, 500);
                /**
                 * Callback function for setting the ref which measureRef is attached to
                 *
                 * @return {void}
                 */
                this.innerRef = el => {
                    this.innerElement = el;
                };
                /**
                 * Gets the ref element which measureRef is attached to
                 *
                 * @return {?HTMLElement} - the HTML element
                 */
                this.getInnerElement = () => this.innerElement;
                this.state = {
                    size: props.size || this.getSize(window.innerWidth),
                };
            }
            /**
             * Calculates the new size
             *
             * @private
             * @param {Component} react component
             * @return {void}
             */
            getSize(width) {
                let size = SIZE_LARGE;
                if (width <= CROSS_OVER_WIDTH_SMALL) {
                    size = SIZE_SMALL;
                }
                else if (width <= CROSS_OVER_WIDTH_MEDIUM) {
                    size = SIZE_MEDIUM;
                }
                return size;
            }
            /**
             * Renders the Box UI Element
             *
             * @private
             * @inheritdoc
             * @return {Element}
             */
            render() {
                const _a = this.props, { isTouch, size, className, componentRef } = _a, rest = __rest(_a, ["isTouch", "size", "className", "componentRef"]);
                let isSmall = size === SIZE_SMALL;
                let isLarge = size === SIZE_LARGE;
                let isMedium = size === SIZE_MEDIUM;
                const isResponsive = !isSmall && !isLarge && !isMedium;
                if ((isSmall && isLarge) || (isSmall && isMedium) || (isMedium && isLarge)) {
                    throw new Error('Box UI Element cannot be small or large or medium at the same time');
                }
                if (!isResponsive) {
                    return ref = { componentRef };
                    isTouch = { isTouch };
                    isSmall = { isSmall };
                    isLarge = { isLarge };
                    isMedium = { isMedium };
                    className = { className };
                    {
                        rest;
                    }
                    />;
                    ;
                }
                const { size: sizeFromState } = this.state;
                isSmall = sizeFromState === SIZE_SMALL;
                isMedium = sizeFromState === SIZE_MEDIUM;
                isLarge = sizeFromState === SIZE_LARGE;
                const styleClassName = classNames({
                    [CLASS_IS_SMALL]: isSmall,
                    [CLASS_IS_MEDIUM]: isMedium,
                    [CLASS_IS_TOUCH]: isTouch,
                }, className);
                return bounds;
                onResize = { this: .onResize };
                innerRef = { this: .innerRef } >
                    {}({ measureRef });
                getInnerRef = { this: .getInnerElement };
                ref = { componentRef };
                isTouch = { isTouch };
                isSmall = { isSmall };
                isLarge = { isLarge };
                isMedium = { isMedium };
                measureRef = { measureRef };
                className = { styleClassName };
                {
                    rest;
                }
                />;
            }
        },
        _a.defaultProps = {
            className: '',
            isTouch: HAS_TOUCH,
        },
        _a) < /Measure>;
    ;
}
;
export default makeResponsive;
//# sourceMappingURL=makeResponsive.js.map