/**
 * @was-flow
 * @file withErrorBoundary HOC which adds error boundaries as well as error logging
 * @author Box
 */
import * as React from 'react';
const withErrorBoundary = (errorOrigin) => (WrappedComponent) => 
// $FlowFixMe doesn't know about forwardRef (https://github.com/facebook/flow/issues/6103)
React.forwardRef((props, ref) => (Object.assign({}, props)), errorOrigin = { errorOrigin } >
    ref, { ref } /  >
    /ErrorBoundary>);
export default withErrorBoundary;
//# sourceMappingURL=withErrorBoundary.js.map