import { NomineeDTO } from "./NomineeDTO";
import { PaymentDTO } from "./PaymentDTO";

export class Policy {

  policyNo: number = 0;
  issueDate: Date = new Date(); // You can set it to the current date or any specific date
  maturityDate: Date = new Date(); // You can set it to the current date or any specific date
  premiumMode: number = 0
  premium: number = 0;
  totalPremiumNo: number = 0
  sumAssured: number = 0;
  status: boolean = true;
  customerId: number = 0;
  agentId?: number = 0;
  schemeId: number = 0;
  PaymentDTO?: PaymentDTO;
  NomineeDTO?: NomineeDTO;
}

