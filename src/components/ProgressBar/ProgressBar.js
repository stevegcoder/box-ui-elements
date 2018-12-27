/**
 * @was-flow
 * @file Progress Bar component
 * @author Box
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
        /**
         * Increaments the progress or resets it
         * depending upon the edge conditions.
         *
         * @return {void}
         */
        this.startProgress = () => {
            const { percent } = this.state;
            if (percent === 0) {
                this.interval = setInterval(this.incrementProgress, 100);
            }
            else if (percent === 100) {
                // Timeout helps transition of hiding the bar to finish
                this.timeout = setTimeout(this.resetProgress, 600);
            }
        };
        /**
         * Increaments the progress very slowly
         *
         * @return {void}
         */
        this.incrementProgress = () => {
            const { percent } = this.state;
            this.setState({
                percent: percent + 2 / (percent || 1),
            });
        };
        /**
         * Resets the progress to 0
         *
         * @return {void}
         */
        this.resetProgress = () => {
            this.setState(ProgressBar.defaultProps);
        };
        const { percent } = props;
        this.state = { percent };
    }
    /**
     * Clears any timeouts and intervals
     *
     * @return {void}
     */
    clearTimeoutAndInterval() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }
    /**
     * Updates state from new props
     *
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        this.clearTimeoutAndInterval();
        const { percent } = nextProps;
        this.setState({ percent }, this.startProgress);
    }
    /**
     * Clears time out
     *
     * @return {void}
     */
    componentWillUnmount() {
        this.clearTimeoutAndInterval();
    }
    /**
     * Renders the progress bar
     *
     * @return {void}
     */
    render() {
        const { percent } = this.state;
        const containerStyle = {
            opacity: percent > 0 && percent < 100 ? 1 : 0,
            transitionDelay: percent > 0 && percent < 100 ? '0' : '0.4s',
        };
        return className = "be-progress-container";
        style = { containerStyle } >
            className;
        "be-progress";
        style = {};
        {
            width: `${percent}%`;
        }
    }
}
ProgressBar.defaultProps = { percent: 0 };
/>
    < /div>;
;
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map