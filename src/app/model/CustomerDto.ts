export class CustomerDTO {
    CustomerFirstName: string;
    CustomerLastName: string;
    Email: string;
    Phone: string;
    Address?: string;
    State: string;
    City?: string;
    Username: string;
    Password: string;
    AgentId?: number; // Assuming it's optional

    constructor(
        CustomerFirstName: string,
        CustomerLastName: string,
        Email: string,
        Phone: string,
        State: string,
        Username: string,
        Password: string,
        Address?: string,
        City?: string,
        AgentId?: number
    ) {
        this.CustomerFirstName = CustomerFirstName;
        this.CustomerLastName = CustomerLastName;
        this.Email = Email;
        this.Phone = Phone;
        this.Address = Address;
        this.State = State;
        this.City = City;
        this.Username = Username;
        this.Password = Password;
        this.AgentId = AgentId;
    }
}
