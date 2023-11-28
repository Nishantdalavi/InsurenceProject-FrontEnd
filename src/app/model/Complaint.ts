export class Complaint {
    complaintId: number = 0;
    customerId: number | null = null;
    complaintName: string = '';
    complaintMessage: string = '';
    dateOfComplaint: Date = new Date();
    Status: boolean = true;
    reply: string = '';
}