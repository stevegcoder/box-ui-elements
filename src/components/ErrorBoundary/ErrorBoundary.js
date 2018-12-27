/**
 * @was-flow
 * @file Error Boundary
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
import noop from 'lodash/noop';
import { ERROR_CODE_UNEXPECTED_EXCEPTION, IS_ERROR_DISPLAYED } from '../../constants';
import DefaultError from './DefaultError';
class ErrorBoundary extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        /**
         * Formats the error and emits it to the top level onError prop
         *
         * @param {Error} e - the error which occured
         * @param {string} type - the error type to identify where the error occured
         * @param {string} code - the error code to identify what error occured
         * @param {Object} contextInfo - additional information which may be useful for the consumer of the error
         * @return {void}
         */
        this.handleError = (error, code, contextInfo = {}, origin = this.props.errorOrigin) => {
            if (!error || !code || !origin) {
                return;
            }
            const elementsError = {
                type: 'error',
                code,
                message: error.message,
                origin,
                context_info: Object.assign({ [IS_ERROR_DISPLAYED]: true }, contextInfo),
            };
            this.props.onError(elementsError);
        };
    }
    componentDidCatch(error, info) {
        this.setState({ error }, () => {
            this.handleError(error, ERROR_CODE_UNEXPECTED_EXCEPTION, Object.assign({}, info), this.props.errorOrigin);
        });
    }
    render() {
        const _a = this.props, { children, errorComponent: ErrorComponent } = _a, rest = __rest(_a, ["children", "errorComponent"]);
        const { error } = this.state;
        if (error) {
            return error;
            {
                error;
            }
            />;;
        }
        return React.cloneElement(children, Object.assign({}, rest, { onError: this.handleError }));
    }
}
ErrorBoundary.defaultProps = {
    errorComponent: DefaultError,
    onError: noop,
};
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map