/**
 * @was-flow
 * @file File Keywords SkillCard component
 * @author Box
 */
import classNames from 'classnames';
import { COLOR_999, COLOR_WHITE } from '../../../../constants';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
import './Face.scss';
const Face = ({ face, selected, isEditing, onDelete, onSelect }) => {
    const isAnyFaceSelected = !!selected;
    const isCurrentFaceSelected = face === selected;
    const isFaceSelected = isAnyFaceSelected && isCurrentFaceSelected && !isEditing;
    const faceClassName = classNames('be-face-wrapper', {
        'be-face-unselected': !isEditing && isAnyFaceSelected && !isCurrentFaceSelected,
    });
    return className = { faceClassName } >
        type;
    "button";
    className = "be-face";
    data - resin - target;
    {
        SKILLS_TARGETS.FACES.FACE;
    }
    onClick = {}();
};
!isEditing && onSelect(face);
    >
        alt;
{
    face.text;
}
title = { face, : .text };
src = { face, : .image_url } /  >
    { isFaceSelected } && color;
{
    COLOR_WHITE;
}
/>}
    < /PlainButton>;
{
    isEditing && type;
    "button";
    className = "be-face-delete";
    data - resin - target;
    {
        SKILLS_TARGETS.FACES.DELETE;
    }
    onClick = {}();
    onDelete(face);
}
    >
        color;
{
    COLOR_999;
}
width = { 16:  };
height = { 16:  } /  >
    /PlainButton>;
/div>;
;
;
export default Face;
//# sourceMappingURL=Face.js.map