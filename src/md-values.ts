import {TextWithLanguage} from "./md-main";

export interface TextsWithLanguageAndId {
    id: string;
    text: TextWithLanguage[];
}

export class MDValue {
    readonly id: string;
    readonly label: TextWithLanguage[];
    value: TextsWithLanguageAndId[] | TextWithLanguage[] | string | null = null;
    valueAsText: string = '';

    constructor(id: string, label: TextWithLanguage[]) {
        this.id = id;
        this.label = label
    }
}
