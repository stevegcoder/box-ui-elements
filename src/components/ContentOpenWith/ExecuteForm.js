/**
 * @was-flow
 * @file Form to invoke an integration via POST
 * @author Box
 */
import React, { PureComponent } from 'react';
import { HTTP_POST } from '../../constants';
class ExecuteForm extends PureComponent {
    constructor(props) {
        super(props);
        this.action = { url };
        this.target = { windowName } || '_blank';
        this.ref = React.createRef();
    }
    componentDidMount() {
        const { onSubmit } = this.props;
        this.ref.current.submit();
        onSubmit();
    }
    render() {
        const { executePostData: { url, params }, id, windowName, } = this.props;
        return ref = { this: .ref };
        id = {} `bcow-execute-form-${id}`;
    }
}
rel = "noreferrer noopener";
method = { HTTP_POST }
    >
        { params } && params.map(({ key, value }) => key, { key }, name = { key }, value = { value }, type = "hidden" /  > );
/form>;
;
export default ExecuteForm;
//# sourceMappingURL=ExecuteForm.js.map