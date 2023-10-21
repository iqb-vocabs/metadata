import {MDProfileEntry} from "./md-profile-entry";
import {LanguageFactory} from "./md-main";

export class MDProfileGroup {
    readonly label: string;
    readonly entries: MDProfileEntry[];
    constructor(groupData: any) {
        this.label = LanguageFactory.getTextFromTextWithLanguage(groupData['label']);
        this.entries = [];
        if (groupData['entries']) {
            const entryArray: any[] = groupData['entries'];
            entryArray.forEach(e => {
                this.entries.push(new MDProfileEntry(e));
            })
        }
    }
}
export class MDProfile {
    readonly id: string;
    readonly label: string;
    readonly groups: MDProfileGroup[];
    constructor(profileData: any) {
        this.id = profileData['id'] || null;
        this.label = LanguageFactory.getTextFromTextWithLanguage(profileData['label']);
        this.groups = [];
        if (profileData['groups']) {
            const groupArray: any[] = profileData['groups'];
            groupArray.forEach(g => {
                this.groups.push(new MDProfileGroup(g));
            })
        }
    }
}
