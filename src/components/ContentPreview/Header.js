/**
 * @was-flow
 * @file Preview header component
 * @author Box
 */
import { injectIntl } from 'react-intl';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import messages from '../messages';
import { COLOR_999 } from '../../constants';
import './Header.scss';
const Header = ({ canAnnotate, canDownload, contentOpenWithProps = {}, file, intl, onClose, onDownload, onPrint, token, }) => {
    const name = file ? file.name : '';
    const id = file && file.id;
    const closeMsg = intl.formatMessage(messages.close);
    const printMsg = intl.formatMessage(messages.print);
    const downloadMsg = intl.formatMessage(messages.download);
    const drawMsg = intl.formatMessage(messages.drawAnnotation);
    const pointMsg = intl.formatMessage(messages.pointAnnotation);
    const shouldRenderOpenWith = id && contentOpenWithProps.show;
    return className = "bcpr-header" >
        className;
    "bp-header bp-base-header" >
        className;
    "bcpr-name" >
        { file }
        < span > { name } < /span>
        < /div>
        < div;
    className = "bcpr-btns" >
        { shouldRenderOpenWith } && className;
    "bcpr-bcow-btn";
    fileId = { id };
    token = { token };
    {
        contentOpenWithProps;
    }
    />;
};
{
    canAnnotate && type;
    "button";
    className = "bcpr-btn bp-btn-annotate-draw bp-is-hidden";
    title = { drawMsg };
    aria - label;
    {
        drawMsg;
    }
        >
            color;
    {
        COLOR_999;
    }
    width = { 18:  };
    height = { 18:  } /  >
        /PlainButton>
        < PlainButton;
    type = "button";
    className = "bcpr-btn bp-btn-annotate-point bp-is-hidden";
    title = { pointMsg };
    aria - label;
    {
        pointMsg;
    }
        >
            color;
    {
        COLOR_999;
    }
    width = { 18:  };
    height = { 18:  } /  >
        /PlainButton>
        < /React.Fragment>;
}
{
    canDownload && type;
    "button";
    className = "bcpr-btn";
    onClick = { onPrint };
    title = { printMsg };
    aria - label;
    {
        printMsg;
    }
        >
            color;
    {
        COLOR_999;
    }
    width = { 22:  };
    height = { 22:  } /  >
        /PlainButton>;
}
{
    canDownload && type;
    "button";
    className = "bcpr-btn";
    onClick = { onDownload };
    title = { downloadMsg };
    aria - label;
    {
        downloadMsg;
    }
        >
            color;
    {
        COLOR_999;
    }
    width = { 18:  };
    height = { 18:  } /  >
        /PlainButton>;
}
{
    onClose && type;
    "button";
    className = "bcpr-btn";
    onClick = { onClose };
    title = { closeMsg };
    aria - label;
    {
        closeMsg;
    }
        >
            color;
    {
        COLOR_999;
    }
    width = { 24:  };
    height = { 24:  } /  >
        /PlainButton>;
}
/div>
    < /div>
    < /div>;
;
;
export default injectIntl(Header);
//# sourceMappingURL=Header.js.map