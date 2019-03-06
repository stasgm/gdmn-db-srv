"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function getLName(n, langPref = [], getFullName = false) {
    for (let i = 0; i < langPref.length; i++) {
        const tn = n[langPref[i]];
        if (tn) {
            return getFullName && tn.fullName ? tn.fullName : tn.name;
        }
    }
    if (!n.en)
        return '';
    return getFullName && n.en.fullName ? n.en.fullName : n.en.name;
}
exports.getLName = getLName;
;
//# sourceMappingURL=LName.js.map