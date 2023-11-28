export class Claim {
    claimId: number = 0;
    claimAmount: number = 0;
    claimDate: Date = new Date();
    bankAccountNo: string = '';
    bankIFSCCode: string = '';
    status: boolean = true;
    policyNo: number | null = null
    customerId: number = 0;
}