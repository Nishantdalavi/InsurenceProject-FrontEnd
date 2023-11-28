import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { AgentDataComponent } from './agent-data/agent-data.component';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { PolicyDataComponent } from './policy-data/policy-data.component';
import { PlanDataComponent } from './plan-data/plan-data.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { AgentHeaderComponent } from './agent-header/agent-header.component';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { ClaimComponent } from './claim/claim.component';
import { CommissionComponent } from './commission/commission.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PolicyCustomerComponent } from './policy-customer/policy-customer.component';
import { QueryCustomerComponent } from './query-customer/query-customer.component';
import { PaymentCustomerComponent } from './payment-customer/payment-customer.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { InsuranceSchemeDetailComponent } from './insurance-scheme-detail/insurance-scheme-detail.component';
import { SchemeDetailComponent } from './scheme-detail/scheme-detail.component';
import { CustomerInsuranceComponent } from './customer-insurance/customer-insurance.component';
import { NominieComponent } from './nominie/nominie.component';
import { AdminQueryComponent } from './admin-query/admin-query.component';
import { PolicyAgentComponent } from './policy-agent/policy-agent.component';
import { CustomerAgentComponent } from './customer-agent/customer-agent.component';
import { authenticationGuard } from './authentication.guard';
import { PurchasingPolicyComponent } from './purchasing-policy/purchasing-policy.component';
import { DocumentComponent } from './document/document.component';
import { CustomerDocumentComponent } from './customer-document/customer-document.component';
import { PaymentReciptComponent } from './payment-recipt/payment-recipt.component';
import { TaxPercentComponent } from './tax-percent/tax-percent.component';
import { AgentCommissionComponent } from './agent-commission/agent-commission.component';
import { EmployeeCommissionComponent } from './employee-commission/employee-commission.component';
import { BuySchemeAgentComponent } from './buy-scheme-agent/buy-scheme-agent.component';
import { AgentInsuranceComponent } from './agent-insurance/agent-insurance.component';
import { AgentCustomerRegisterationComponent } from './agent-customer-registeration/agent-customer-registeration.component';
import { InstallmentPoliciesComponent } from './installment-policies/installment-policies.component';
import { PolicyWithProfileComponent } from './policy-with-profile/policy-with-profile.component';
import { AgentInstallemntViewComponent } from './agent-installemnt-view/agent-installemnt-view.component';
import { CustomerClaimComponent } from './customer-claim/customer-claim.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'customer', component: CustomerDataComponent,canActivate:[authGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminHeaderComponent,canActivate:[authGuard] },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'employee', component: EmployeeDataComponent,canActivate:[authGuard] },
  { path: 'agent', component: AgentDataComponent ,canActivate:[authGuard]},
  { path: 'agent/login', component: AgentLoginComponent ,canActivate:[authGuard]},
  { path: 'employee/login', component: EmployeeLoginComponent ,canActivate:[authGuard]},
  { path: 'customer/login', component: CustomerLoginComponent,canActivate:[authGuard] },
  { path: 'payment', component: PaymentDataComponent ,canActivate:[authGuard]},
  { path: 'policy', component: PolicyDataComponent ,canActivate:[authGuard]},
  { path: 'plan', component: PlanDataComponent ,canActivate:[authGuard]},
  { path: 'customer/header', component: CustomerHeaderComponent ,canActivate:[authGuard]},
  { path: 'agent/header', component: AgentHeaderComponent ,canActivate:[authGuard]},
  { path: 'employee/header', component: EmployeeHeaderComponent ,canActivate:[authGuard]},
  { path: 'claim', component: ClaimComponent ,canActivate:[authGuard]},
  { path: 'commission', component: CommissionComponent ,canActivate:[authGuard]},
  { path: 'complaint', component: ComplaintComponent ,canActivate:[authGuard]},
  { path: 'password', component: UpdatePasswordComponent ,canActivate:[authGuard]},
  { path: 'customer/policy', component: PolicyCustomerComponent ,canActivate:[authGuard]},
  { path: 'customer/query', component: QueryCustomerComponent },
  { path: 'admin/query', component: AdminQueryComponent },
  { path: 'customer/payment', component: PaymentCustomerComponent },
  { path: 'agent/profile', component: AgentProfileComponent },
  { path: 'insuranceScheme', component: InsuranceSchemeDetailComponent },
  { path: 'schemeDetail', component: SchemeDetailComponent },
  { path: 'customer/scheme/:id', component: CustomerInsuranceComponent },
  { path: 'nominie', component: NominieComponent },
  { path: 'agent/policy', component: PolicyAgentComponent },
  { path: 'agent/customer', component: CustomerAgentComponent },
  { path: 'customer/buyPolicy', component: PurchasingPolicyComponent },
  { path: 'customer/document', component: CustomerDocumentComponent },
  { path: 'customer/view/document', component: DocumentComponent },
  { path: 'payment/recipt', component: PaymentReciptComponent },
  { path: 'admin/tax', component: TaxPercentComponent },
  { path: 'agent/commission', component: AgentCommissionComponent },
  { path: 'employee/commission', component: EmployeeCommissionComponent },
  { path: 'agent/buyPolicy', component: BuySchemeAgentComponent },
  { path: 'agent/view/plan/:id', component: AgentInsuranceComponent },
  { path: 'agent/register/customer', component: AgentCustomerRegisterationComponent },
  { path: 'installment/:id', component: InstallmentPoliciesComponent },
  { path: 'view/installment/:id', component: AgentInstallemntViewComponent },
  { path: 'View/claim', component: CustomerClaimComponent },
  { path: 'policy/profile', component: PolicyWithProfileComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
