import {LanguageFactory} from "./md-main";

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
    readonly minValue: number | null;
    readonly maxValue: number | null;
    readonly isPeriodSeconds: boolean;

    constructor(profileEntryParameters: any) {
        this.digits = profileEntryParameters['digits'] || 0;
        if (profileEntryParameters['minValue'] === null) {
            this.minValue = null;
        } else {
            this.minValue = profileEntryParameters['minValue'];
        }
        if (profileEntryParameters['maxValue'] === null) {
            this.maxValue = null;
        } else {
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
}
