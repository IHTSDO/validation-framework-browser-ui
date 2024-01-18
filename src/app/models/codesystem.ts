export class Codesystem {
    constructor(
        public branchPath: string,
        public countryCode: string,
        public dailyBuildAvailable: boolean,
        public languages: object,
        public latestDailyBuild: string,
        public latestVersion: object,
        public modules: object[],
        public name: string,
        public shortName: string,
        public userRoles: object[]
    ) {
    }
}
