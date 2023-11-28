export class PaymentDTO {

    paymentType: string = 'card'
    paymentDate: Date = new Date()
    amount: number = 0
    tax: number = 0
    customerId: number = 0
    totalPayment: number = 0

    status: Boolean = true
    policyNo?: number = 0

    // policyNo: number = 0;
    cardNumber: string = ''
    // expiryDate: Date = new Date()
    cvv: string = '';
}