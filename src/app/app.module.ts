import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { PolicyDataComponent } from './policy-data/policy-data.component';
import { AgentDataComponent } from './agent-data/agent-data.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { UserProfileDialogComponent } from './user-profile-dialog/user-profile-dialog.component'; // Import MatProgressSpinnerModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PlanDataComponent } from './plan-data/plan-data.component';
import { AgentHeaderComponent } from './agent-header/agent-header.component';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ClaimComponent } from './claim/claim.component';
import { CommissionComponent } from './commission/commission.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PolicyCustomerComponent } from './policy-customer/policy-customer.component';
import { QueryCustomerComponent } from './query-customer/query-customer.component';
import { PaymentCustomerComponent } from './payment-customer/payment-customer.component';
import { SchemeDetailComponent } from './scheme-detail/scheme-detail.component';
import { InsuranceSchemeDetailComponent } from './insurance-scheme-detail/insurance-scheme-detail.component';
import { CustomerInsuranceComponent } from './customer-insurance/customer-insurance.component';
import { NominieComponent } from './nominie/nominie.component';
import { AdminQueryComponent } from './admin-query/admin-query.component';
import { PolicyAgentComponent } from './policy-agent/policy-agent.component';
import { CustomerAgentComponent } from './customer-agent/customer-agent.component';
import { PurchasingPolicyComponent } from './purchasing-policy/purchasing-policy.component';
import { DocumentComponent } from './document/document.component';
import { CustomerDocumentComponent } from './customer-document/customer-document.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PaymentReciptComponent } from './payment-recipt/payment-recipt.component';
import { TaxPercentComponent } from './tax-percent/tax-percent.component';
import { BuySchemeAgentComponent } from './buy-scheme-agent/buy-scheme-agent.component';
import { AgentCommissionComponent } from './agent-commission/agent-commission.component';
import { EmployeeCommissionComponent } from './employee-commission/employee-commission.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AgentInsuranceComponent } from './agent-insurance/agent-insurance.component';
import { AgentCustomerRegisterationComponent } from './agent-customer-registeration/agent-customer-registeration.component';
import { InstallmentPoliciesComponent } from './installment-policies/installment-policies.component';
import { PolicyWithProfileComponent } from './policy-with-profile/policy-with-profile.component';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { SchemeModalComponent } from './scheme-modal/scheme-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentModalComponent } from './agent-modal/agent-modal.component';
import { ModalPolicyComponent } from './modal-policy/modal-policy.component';
import { ModalPlanComponent } from './modal-plan/modal-plan.component';
import { AgentViewCustomerComponent } from './agent-view-customer/agent-view-customer.component';
import { ModalAgentComponent } from './modal-agent/modal-agent.component';
import { ModalCustomerComponent } from './modal-customer/modal-customer.component';
import { ModalSchemeComponent } from './modal-scheme/modal-scheme.component';
import { AgentInstallemntViewComponent } from './agent-installemnt-view/agent-installemnt-view.component';
import { CustomerClaimComponent } from './customer-claim/customer-claim.component';
import { CustomerheaderComponent } from './customerheader/customerheader.component';
import { EmployeeheaderComponent } from './employeeheader/employeeheader.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AgentheaderComponent } from './agentheader/agentheader.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';

export function tokenGetter() {
  return localStorage.getItem('token'); // Change this to match your token storage method
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeContentComponent,
    HomeFooterComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    CustomerDataComponent,
    RegistrationFormComponent,
    EmployeeDataComponent,
    PolicyDataComponent,
    AgentDataComponent,
    CustomerLoginComponent,
    AgentLoginComponent,
    EmployeeLoginComponent,
    PaymentDataComponent,
    UserProfileDialogComponent,
    PlanDataComponent,
    AgentHeaderComponent,
    EmployeeHeaderComponent,
    CustomerHeaderComponent,
    AgentProfileComponent,
    EmployeeProfileComponent,
    CustomerProfileComponent,
    ClaimComponent,
    CommissionComponent,
    ComplaintComponent,
    UpdatePasswordComponent,
    PolicyCustomerComponent,
    QueryCustomerComponent,
    PaymentCustomerComponent,
    SchemeDetailComponent,
    InsuranceSchemeDetailComponent,
    CustomerInsuranceComponent,
    NominieComponent,
    AdminQueryComponent,
    PolicyAgentComponent,
    CustomerAgentComponent,
    PurchasingPolicyComponent,
    DocumentComponent,
    CustomerDocumentComponent,
    PaymentReciptComponent,
    TaxPercentComponent,
    BuySchemeAgentComponent,
    AgentCommissionComponent,
    EmployeeCommissionComponent,
    AgentInsuranceComponent,
    AgentCustomerRegisterationComponent,
    InstallmentPoliciesComponent,
    PolicyWithProfileComponent,
    CustomerModalComponent,
    SchemeModalComponent,
    AgentModalComponent,
    ModalPolicyComponent,
    ModalPlanComponent,
    AgentViewCustomerComponent,
    ModalAgentComponent,
    ModalCustomerComponent,
    ModalSchemeComponent,
    AgentInstallemntViewComponent,
    CustomerClaimComponent,
    CustomerheaderComponent,
    EmployeeheaderComponent,
    AdminheaderComponent,
    AgentheaderComponent,
    CustomModalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    MatInputModule,
    MatButtonModule,
    NgbModalModule



  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
