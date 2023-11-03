import {LanguageFactory, profileEntryTextFormatAsText} from "./md-main";

export class ProfileEntryParametersVocabulary {
    readonly url: string;
    readonly allowMultipleValues: boolean;
    readonly maxLevel: number;
    readonly hideNumbering: boolean;
    readonly hideTitle: boolean;
    readonly hideDescription: boolean;
    readonly addTextLanguages: string[];

    constructor(profileEntryParameters: any) {
        this.url = profileEntryParameters['url'] || '?url';
        this.allowMultipleValues = profileEntryParameters['allowMultipleValues'] || false;
        this.maxLevel = profileEntryParameters['maxLevel'] || 0;
        this.hideNumbering = profileEntryParameters['hideNumbering'] || false;
        this.hideTitle = profileEntryParameters['hideTitle'] || false;
        this.hideDescription = profileEntryParameters['hideDescription'] || false;
        this.addTextLanguages = profileEntryParameters['addTextLanguages'] || [];
    }
}

export class ProfileEntryParametersText {
    readonly format: string;
    readonly textLanguages: string[];
    readonly pattern: string;

    constructor(profileEntryParameters: any) {
        this.format = profileEntryParameters['format'] || '';
        this.pattern = profileEntryParameters['pattern'] || '';
        this.textLanguages = profileEntryParameters['textLanguages'] || ['de'];
    }
}

export class ProfileEntryParametersNumber {
    readonly digits: number;
    readonly minValue: number | null = null;
    readonly maxValue: number | null = null;
    readonly isPeriodSeconds: boolean;

    constructor(profileEntryParameters: any) {
        this.digits = profileEntryParameters['digits'] || 0;
        if (typeof profileEntryParameters['minValue'] === 'number') {
            this.minValue = profileEntryParameters['minValue'];
        }
        if (typeof profileEntryParameters['maxValue'] === 'number') {
            this.maxValue = profileEntryParameters['maxValue'];
        }
        this.isPeriodSeconds = profileEntryParameters['isPeriodSeconds'] || false;
    }
}

export class ProfileEntryParametersBoolean {
    readonly trueLabel: string;
    readonly falseLabel: string;
    constructor(profileEntryParameters: any) {
        this.trueLabel = LanguageFactory.getTextFromTextWithLanguage(profileEntryParameters['trueLabel']);
        this.falseLabel = LanguageFactory.getTextFromTextWithLanguage(profileEntryParameters['falseLabel']);
    }
}

export class MDProfileEntry {
    readonly id: string;
    readonly label: string;
    readonly type: string;
    readonly parameters: ProfileEntryParametersNumber | ProfileEntryParametersBoolean |
        ProfileEntryParametersText | ProfileEntryParametersVocabulary | null;
    constructor(entryData: any) {
        this.id = entryData['id'] || '';
        this.label = LanguageFactory.getTextFromTextWithLanguage(entryData['label']);
        this.type = entryData['type'] || '';
        this.parameters = null;
        if (entryData['parameters']) {
            if (this.type === 'number') {
                this.parameters = new ProfileEntryParametersNumber(entryData['parameters']);
            } else if (this.type === 'text') {
                this.parameters = new ProfileEntryParametersText(entryData['parameters']);
            } else if (this.type === 'boolean') {
                this.parameters = new ProfileEntryParametersBoolean(entryData['parameters']);
            } else if (this.type === 'vocabulary') {
                this.parameters = new ProfileEntryParametersVocabulary(entryData['parameters']);
            }
        }
    }
    getParametersAsText(): string {
        let returnText = '';
        if (this.parameters && this.type) {
            if (this.parameters && this.type) {
                if (this.type === 'number') {
                    const p = this.parameters as ProfileEntryParametersNumber;
                    returnText = `Kommastellen: ${p.digits}, Mindestwert: ${p.minValue === null ? 'kein' : p.minValue}, Maximalwert: ${p.maxValue === null ? 'kein' : p.maxValue}${p.isPeriodSeconds ? ', als Sekunden' : ''}`
                } else if (this.type === 'text') {
                    const p = this.parameters as ProfileEntryParametersText;
                    returnText = `${profileEntryTextFormatAsText[p.format]}, Sprache(n): ${p.textLanguages.join('/')}${p.pattern ? ', Gültigkeitsmuster: ' + p.pattern : ''}`
                } else if (this.type === 'boolean') {
                    const p = this.parameters as ProfileEntryParametersBoolean;
                    returnText = `Text für WAHR: ${p.trueLabel}, Text für FALSCH: ${p.falseLabel}`
                } else if (this.type === 'vocabulary') {
                    const p = this.parameters as ProfileEntryParametersVocabulary;
                    const levelText = p.maxLevel > 1 ? ', Zeige nur erste ' + p.maxLevel + ' Ebenen' : ', Zeige nur erste Ebene';
                    returnText = `url: '${p.url}', ${p.allowMultipleValues ? 'Mehrfachauswahl' : 'Einmalauswahl'}${p.maxLevel > 0 ? levelText : ''}${p.hideNumbering ? ', verberge Nummerierung' : ''}${p.hideTitle ? ', verberge Titel' : ''}${p.hideDescription ? ', verberge Beschreibung' : ''}${p.addTextLanguages && p.addTextLanguages.length > 0 ? ', mit Texteingabe in Sprache(n): ' + p.addTextLanguages.join('/') : ''}`
                }
            }
        }
        return returnText;
    }
}
