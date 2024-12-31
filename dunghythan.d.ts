
declare module 'dunghythan' {
    const dunghythan: {
        dungHyThan: (year: number, month: number, day: number, hour: number|null|undefined, minute: number|null|un , gender: number) => any;
        getFormattedJson: (res: any) => any;
    };
    export default dunghythan;
}