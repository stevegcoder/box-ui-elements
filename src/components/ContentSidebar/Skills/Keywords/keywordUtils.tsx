/**
 * @was-flow
 * @file Utilities for keywords skill
 * @author Box
 */
import { Pill } from './flowTypes';
import { SkillCardEntry } from '../../../../types';
/**
 * Converts skill card entries into pills
 *
 * @private
 * @param {Array<Object>} props - keyword entries
 * @return {Array<Object>} pills
 */

const getPills = (keywords: Array<SkillCardEntry> = []): Array<Pill> => 
    keywords.map(
        (keyword: SkillCardEntry, index: number): Pill => ({
            value: index,
            text: ((keyword.text as any) as string)
        })
    );

export default getPills;
