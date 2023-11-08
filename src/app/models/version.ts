export class Version {
    constructor(
        public version: string,
        public branchPath: string,
        public parentBranchPath: string,
        public shortName: string,
        public description: string,
        public effectiveDate: number,
        public importDate: string
    ) {
    }
}
