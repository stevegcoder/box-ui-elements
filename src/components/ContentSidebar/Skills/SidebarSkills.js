/**
 * @was-flow
 * @file Details sidebar component
 * @author Box
 */
import uniqueId from 'lodash/uniqueId';
import messages from '../../messages';
import { isValidSkillsCard } from './skillUtils';
import { SKILLS_TARGETS } from '../../../interactionTargets';
import { SKILLS_TRANSCRIPT, SKILLS_KEYWORD, SKILLS_TIMELINE, SKILLS_FACE, SKILLS_STATUS, SKILLS_ERROR_UNKNOWN, } from '../../../constants';
/**
 * Get ths skill interaction target based on card type
 *
 * @param {Object} card - skill card
 * @return {string} - interaction target
 */
const getCardInteractionTarget = ({ skill_card_type }) => {
    switch (skill_card_type) {
        case SKILLS_KEYWORD:
            return SKILLS_TARGETS.KEYWORDS.CARD;
        case SKILLS_FACE:
        case SKILLS_TIMELINE:
            return SKILLS_TARGETS.FACES.CARD;
        case SKILLS_TRANSCRIPT:
            return SKILLS_TARGETS.TRANSCRIPTS.CARD;
        default:
            return '';
    }
};
/**
 * Get ths string skill title based on card title
 *
 * @param {Object} card - skill card
 * @return {string} - skill title
 */
const getCardTitle = ({ skill_card_type, skill_card_title = {} }) => {
    const { code, message } = skill_card_title;
    const defaultKey = `${skill_card_type}Skill`;
    const defaultMessage = messages[defaultKey] || messages.defaultSkill;
    switch (code) {
        case 'skills_faces':
            return Object.assign({}, messages.faceSkill) /  > ;
        case 'skills_transcript':
            return Object.assign({}, messages.transcriptSkill) /  > ;
        case 'skills_topics':
            return Object.assign({}, messages.topicsSkill) /  > ;
        case 'skills_status':
            return Object.assign({}, messages.statusSkill) /  > ;
        case 'skills_error':
            return Object.assign({}, messages.errorSkill) /  > ;
        default:
            return message || Object.assign({}, defaultMessage) /  > ;
    }
};
const SidebarSkills = ({ file, cards, errors, getViewer, onSkillChange }) => {
    const { permissions = {} } = file;
    const isSkillEditable = !!permissions.can_upload;
    return cards.map((card, index) => {
        if (card.error && !card.status) {
            card.skill_card_type = SKILLS_STATUS;
            card.status = {
                code: SKILLS_ERROR_UNKNOWN,
            };
            delete card.error;
        }
        const { id } = card;
        const cardId = id || uniqueId('card_');
        const isValid = isValidSkillsCard(file, card);
        const interactionTarget = getCardInteractionTarget(card);
        const title = getCardTitle(card);
        const hasEntries = Array.isArray(card.entries) ? card.entries.length > 0 : isValid;
        return isValid ? key = { cardId } : ;
        isOpen = { hasEntries };
        interactionTarget = { interactionTarget };
        title = { title } >
            card;
        {
            card;
        }
        cards = { cards };
        hasError = {};
        errors[index];
    }, isEditable = { isSkillEditable }, getViewer = { getViewer }, onSkillChange = {}(...args));
};
onSkillChange(index, ...args);
/>
    < /SidebarSection>;
null;
;
;
export default SidebarSkills;
//# sourceMappingURL=SidebarSkills.js.map