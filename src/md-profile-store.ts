import {LanguageFactory} from "./md-main";

export class MDProfileStore {
    readonly id: string;
    readonly title: string;
    readonly publisher: string;
    readonly maintainer: string;
    readonly profiles: string[];
    constructor(profileStoreData: any) {
        this.id = profileStoreData['id'] || null;
        this.title = LanguageFactory.getTextFromTextWithLanguage(profileStoreData['title']);
        this.publisher = profileStoreData['publisher'] || profileStoreData['creator'];
        this.maintainer = profileStoreData['maintainer'];
        this.profiles = [];
        if (profileStoreData['profiles']) {
            this.profiles = profileStoreData['profiles'];
        }
    }
}
