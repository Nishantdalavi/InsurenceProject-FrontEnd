import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent {
  agentId: number;
  agentFirstName: string;
  agentLastName: string;
  qualification: string;
  email: string;
  phone: string;
  userId: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private agentService: AgentService,
    private dialogRef: MatDialogRef<AgentProfileComponent>,) {
    this.agentId = data.agentId;
    this.agentFirstName = data.agentFirstName;
    this.agentLastName = data.agentLastName;
    this.qualification = data.qualification;
    this.email = data.email;
    this.phone = data.phone;
    this.userId = data.userId;
    localStorage.setItem('agentId', data.agentId);
  }
  
  onSubmit() {

    // Create an object with the modified data
    const agentData = {
      agentId: this.agentId,
      agentFirstName: this.agentFirstName,
      agentLastName: this.agentLastName,
      qualification: this.qualification,
      email: this.email,
      phone: this.phone,
      userId: this.userId
    };

    // Call the API service to update the agent data
    this.agentService.updateAgent(agentData).subscribe(
      (updatedAgentId) => {
        alert("Updated Successfully")
        // Handle success (e.g., display a success message)
        console.log('Agent updated successfully.');
        this.dialogRef.close(updatedAgentId);
      },
      (error) => {
        alert("Some issue try later")
        // Handle error (e.g., display an error message)
        console.error('Error updating agent:', error);
      }
    );
  }
}
