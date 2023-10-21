import {LanguageFactory} from "./md-main";

export class MDProfileStore {
    readonly id: string;
    readonly title: string;
    readonly creator: string;
    readonly profiles: string[];
    constructor(profileStoreData: any) {
        this.id = profileStoreData['id'] || null;
        this.title = LanguageFactory.getTextFromTextWithLanguage(profileStoreData['title']);
        this.creator = LanguageFactory.getTextFromTextWithLanguage(profileStoreData['creator']);
        this.profiles = [];
        if (profileStoreData['profiles']) {
            this.profiles = profileStoreData['profiles'];
        }
    }
}
