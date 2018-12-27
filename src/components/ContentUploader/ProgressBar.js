/**

 * @file Component for a progress bar
 */
import { PureComponent } from 'react';
import './ProgressBar.scss';
class ProgressBar extends PureComponent {
    /**
     * [constructor]
     *
     * @return {ProgressBar}
     */
    constructor(props) {
        super(props);
        const { percent } = props;
        this.state = { percent };
    }
    /**
     * Updates state from new props
     *
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        const { percent } = nextProps;
        this.setState({ percent });
    }
    /**
     * Renders the progress bar
     *
     * @return {void}
     */
    render() {
        const { percent } = this.state;
        const containerStyle = {
            transitionDelay: percent > 0 && percent < 100 ? '0' : '0.4s',
        };
        return className = "bcu-progress-container";
        style = { containerStyle } >
            className;
        "bcu-progress";
        style = {};
        {
            width: `${percent}%`;
        }
    }
}
ProgressBar.defaultProps = {
    percent: 0,
};
/>
    < /div>;
;
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map