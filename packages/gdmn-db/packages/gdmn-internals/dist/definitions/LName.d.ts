export declare type Lang = 'ru' | 'by' | 'en';
export interface ITName {
    name: string;
    fullName?: string;
}
export declare type LName = {
    [lang in Lang]?: ITName;
};
export declare function getLName(n: LName, langPref?: Lang[], getFullName?: boolean): string;
//# sourceMappingURL=LName.d.ts.map