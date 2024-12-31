import * as  levenshtein from 'fast-levenshtein';
import { cities } from '../../config/constants';
import { text } from 'express';

const comparedText = (text1: string) => {
    const citiTexts=cities;
    let bestMatch = null;
     let smallestDistance = Infinity;
    for(const query of citiTexts){
        const distance = levenshtein.get(text1.toLowerCase(), query.name.toLowerCase());
            if (distance < smallestDistance) {
            smallestDistance = distance;
            bestMatch = query;
            }
    }
    return bestMatch;
}

console.log(comparedText('Ha Noi viet Nam'));