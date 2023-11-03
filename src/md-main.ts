import profileSchema from './schemas/md-profile.schema.json';
import profileStoreSchema from './schemas/md-profile-store.schema.json';
import profileValuesSchema from './schemas/md-values.schema.json';

export const profileSchemaJSON = profileSchema;
export const profileStoreSchemaJSON = profileStoreSchema;
export const profileValuesSchemaJSON = profileValuesSchema;

export interface TextWithLanguage {
    "lang": string,
    "value": string
}

export const profileEntryTypeAsText: { [key: string]: string } = {
    "number": "Zahl",
    "boolean": "Ja/Nein",
    "vocabulary": "Vokabular",
    "text": "Text"
}

export const profileEntryTextFormatAsText: { [key: string]: string } = {
    "single": "Einzeilig",
    "multiline": "Mehrzeilig",
    "html": "Html/formatierter Text"
}

export class LanguageFactory {
    static lang = "de";
    static getTextFromTextWithLanguage(langArray: any | null): string {
        if (langArray) {
            const langArrayTyped: TextWithLanguage[] = langArray;
            const textEntry = langArrayTyped.find(t => t.lang === LanguageFactory.lang);
            if (textEntry) return textEntry['value'] || '';
            if (langArrayTyped.length > 0) {
                return langArrayTyped[0]['value'] || '';
            }
        }
        return '';
    }
}
