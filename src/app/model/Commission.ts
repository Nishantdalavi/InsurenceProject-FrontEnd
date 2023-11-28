export class Commission {
    commissionId: number = 0;
    amount: number = 0;
    date: Date = new Date();
    status: boolean = true;
    policyId: number | null = null;
    agentId: number | null = null;
}