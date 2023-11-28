// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { CustomerService } from '../services/customer.service';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-document',
//   templateUrl: './document.component.html',
//   styleUrls: ['./document.component.css']
// })
// export class DocumentComponent {

//   customerProfile: any
//   documents: any
//   documentDetails!: FormGroup;
//   headers: any

//   documentForm!: FormGroup;
//   documentType: string = 'pan card'; // Initial document type
//   isUploadDisabled: boolean = false; // Flag to disable the upload button
//   isPanCardUploadDisabled: boolean = false;
//   isAadhaarCardUploadDisabled: boolean = false;
//   isVoterCardUploadDisabled: boolean = false;
//   isAadhaarCardFileSelected: boolean = false;
//   isVoterCardFileSelected: boolean = false;
//   isPanCardFileSelected: boolean = false;
//   uploadedDocuments: { [key: string]: boolean } = {};
//   currentPage: number = 1
//   pageSizes: number[] = [10, 20, 30];
//   totalDocumentCount = 0;
//   pageSize = this.pageSizes[0];
//   constructor(private customer: CustomerService, private http: HttpClient, private formBuilder: FormBuilder) { }

//   ngOnInit() {

//     this.getDocuments()
//     this.documentForm = this.formBuilder.group({
//       documentType: ['', Validators.required],
//       file: [null, Validators.required],
//     });
//   }
//   deleteDocument(documentId: number) {
//     this.customer.deleteDocument(documentId).subscribe(
//       (response) => {
//         // Handle the response from the server after successful deletion if needed
//         console.log('Document deleted successfully', response);
//         alert("Document deleted successfully");
//         // Refresh the document list or perform any necessary actions
//         // this.fetchDocuments(); // Assuming there's a method to fetch the updated list
//         window.location.reload()
//       },
//       (error) => {
//         // Handle errors if the deletion fails
//         console.error('Document deletion failed', error);
//         alert("Document deletion failed");
//       }
//     );
//   }

//   getDocuments() {

//     this.customer.getCustomerProfile().subscribe({
//       next: (res) => {
//         this.customerProfile = res;
//         this.customer.getCustomerDocumentsOnly(this.customerProfile.customerId, this.currentPage, this.pageSize).subscribe({
//           next: (response) => {

//             const paginationHeader = response.headers.get('X-Pagination');
//             console.log(paginationHeader);
//             const paginationData = JSON.parse(paginationHeader!);
//             console.log(paginationData.TotalCount);

//             this.totalDocumentCount = paginationData.TotalCount;
//             this.documents = response.body;
//             console.log("Documents :", this.documents)
//             //this.updatePaginatedEmployees();

//           }
//         })
//       },
//       error: (err: HttpErrorResponse) => {
//         console.log(err);
//       }
//     })

//   }
//   get pageNumbers(): number[] {
//     return Array.from({ length: this.pageCount }, (_, i) => i + 1);
//   }
//   get pageCount(): number {
//     return Math.ceil(this.totalDocumentCount / this.pageSize);
//   }



//   changePage(page: number) {

//     this.currentPage = page;
//     this.getDocuments();
//   }
//   calculateSRNumber(index: number): number {
//     return (this.currentPage - 1) * this.pageSize + index + 1;
//   }
//   onPageSizeChange(event: Event) {
//     this.pageSize = +(event.target as HTMLSelectElement).value;
//     this.getDocuments();
//   }
//   downloadDocument(doc: any) {

//     this.customer.downloadFile(doc.documentId).subscribe((response) => {
//       const contentDispositionHeader = response.headers.get('Content-Disposition');
//       const fileName = contentDispositionHeader?.split(';')[1].split('filename=')[1].trim();

//       if (response.body instanceof Blob && fileName) {
//         // Create a Blob object from the response data
//         const blob = new Blob([response.body], { type: response.body.type });

//         // Trigger a file download
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = fileName;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       } else {
//         console.error('Response body is not a Blob.');
//       }
//     });
//   }
//   fileToUpload: File | null = null; // Initialize it as null
//   customerId: number = 0;
//   uploadDocument(documentType: string) {
//     const customerIdString = localStorage.getItem('customerId');

//     if (customerIdString !== null) {
//       this.customerId = +customerIdString; // Use the + operator to convert the string to a number
//     } else {
//       // Handle the case where customerIdString is null
//     }
//     console.log(this.documents)
//     if (this.fileToUpload) {
//       // Check if a document of the selected type has already been uploaded

//       if (this.documents.some((doc: Document) => doc.documentType === documentType)) {
//         alert(`Document type ${documentType} already uploaded.`);
//         // You can display an error message or take other actions here
//         return;
//       }

//       this.customer.uploadDocument(this.fileToUpload, this.customerId, documentType).subscribe(
//         (response) => {
//           // Handle the response from the server after successful upload if needed
//           this.uploadedDocuments[documentType] = true;
//           this.checkAllDocumentsUploaded();

//           console.log('Upload successful', response);
//           alert('Uploaded Successfully');
//           window.location.reload();
//           this.getDocuments()
//         },
//         (error) => {
//           // Handle errors if the upload fails
//           console.error('Upload failed', error);
//           alert('Uploaded failed');
//           window.location.reload();

//         }
//       );
//     } else {
//       // Handle the case where there is no file selected
//       console.error('No file selected for upload.');
//       alert('No file Selected');
//     }
//   }


//   checkAllDocumentsUploaded() {
//     const requiredDocumentTypes = ['Pan Card', 'Adhaar Card', 'Voter Card'];

//     this.isPanCardUploadDisabled = this.uploadedDocuments['Pan Card'];
//     this.isAadhaarCardUploadDisabled = this.uploadedDocuments['Adhaar Card'];
//     this.isVoterCardUploadDisabled = this.uploadedDocuments['Voter Card'];

//     this.isUploadDisabled = requiredDocumentTypes.every(
//       (type) => this.uploadedDocuments[type]
//     );
//   }

//   onFileSelected(files: FileList | null, documentType: string) {
//     if (files && files.length > 0) {
//       this.fileToUpload = files[0];
//       // Set the property to true when a file is selected for Aadhaar Card
//       if (documentType === 'Aadhaar Card') {
//         this.isAadhaarCardFileSelected = true;
//       }
//       if (documentType === 'Voter Card') {
//         this.isVoterCardFileSelected = true;
//       }
//       if (documentType === 'Pan Card') {
//         this.isPanCardFileSelected = true;
//       }
//     } else {
//       // Handle the case where there is no file selected, e.g., show an error message.
//       this.fileToUpload = null;
//       console.error('No file selected.');
//     }
//   }
// }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Document } from '../model/Document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent {

  customerProfile: any
  documents: any
  documentDetails!: FormGroup;
  headers: any

 

  documentForm!: FormGroup;
  documentType: string = 'pan card'; // Initial document type
  isUploadDisabled: boolean = false; // Flag to disable the upload button
  isPanCardUploadDisabled: boolean = false;
  isAadhaarCardUploadDisabled: boolean = false;
  isVoterCardUploadDisabled: boolean = false;
  isAadhaarCardFileSelected: boolean = false;
  isVoterCardFileSelected: boolean = false;
  isPanCardFileSelected: boolean = false;
  uploadedDocuments: { [key: string]: boolean } = {};
  currentPage: number = 1
  pageSizes: number[] = [10, 20, 30];
  totalDocumentCount = 0;
  pageSize = this.pageSizes[0];
  constructor(private customer: CustomerService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getDocuments()
    this.documentForm = this.formBuilder.group({
      documentType: ['', Validators.required],
      file: [null, Validators.required],
    });
  }
  deleteDocument(documentId: number) {
    this.customer.deleteDocument(documentId).subscribe(
      (response) => {
        // Handle the response from the server after successful deletion if needed
        console.log('Document deleted successfully', response);
        alert("Document deleted successfully");
        // Refresh the document list or perform any necessary actions
        // this.fetchDocuments(); // Assuming there's a method to fetch the updated list
        window.location.reload()
      },
      (error) => {
        // Handle errors if the deletion fails
        console.error('Document deletion failed', error);
        alert("Document deletion failed");
      }
    );
  }

  getDocuments() {

    this.customer.getCustomerProfile().subscribe({
      next: (res) => {
        this.customerProfile = res;
        this.customer.getCustomerDocumentsOnly(this.customerProfile.customerId, this.currentPage, this.pageSize).subscribe({
          next: (response) => {

            const paginationHeader = response.headers.get('X-Pagination');
            console.log(paginationHeader);
            const paginationData = JSON.parse(paginationHeader!);
            console.log(paginationData.TotalCount);

            this.totalDocumentCount = paginationData.TotalCount;
            this.documents = response.body;
            console.log("Documents :", this.documents)
            //this.updatePaginatedEmployees();

          }
        })
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })

  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
  get pageCount(): number {
    return Math.ceil(this.totalDocumentCount / this.pageSize);
  }



  changePage(page: number) {

    this.currentPage = page;
    this.getDocuments();
  }
  calculateSRNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.getDocuments();
  }
  downloadDocument(doc: any) {

    this.customer.downloadFile(doc.documentId).subscribe((response) => {
      const contentDispositionHeader = response.headers.get('Content-Disposition');
      const fileName = contentDispositionHeader?.split(';')[1].split('filename=')[1].trim();

      if (response.body instanceof Blob && fileName) {
        // Create a Blob object from the response data
        const blob = new Blob([response.body], { type: response.body.type });

        // Trigger a file download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Response body is not a Blob.');
      }
    });
  }
  fileToUpload: File | null = null; // Initialize it as null
  customerId: number = 0;
  uploadDocument(documentType: string) {
    const customerIdString = localStorage.getItem('customerId');

    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
      // Handle the case where customerIdString is null
    }
    console.log(this.documents)
    if (this.fileToUpload) {
      // Check if a document of the selected type has already been uploaded

      if(this.documents)
      {
        if (this.documents.some((doc: Document) => doc.documentType === documentType)) {
          alert(`Document type ${documentType} already uploaded.`);
          // You can display an error message or take other actions here
          return;
        }
      }

      this.customer.uploadDocument(this.fileToUpload, this.customerId, documentType).subscribe(
        (response) => {
          // Handle the response from the server after successful upload if needed
          this.uploadedDocuments[documentType] = true;
          this.checkAllDocumentsUploaded();

          console.log('Upload successful', response);
          alert('Uploaded Successfully');
          window.location.reload();
          this.getDocuments()
        },
        (error) => {
          // Handle errors if the upload fails
          console.error('Upload failed', error);
          alert('Uploaded failed');
          window.location.reload();

        }
      );
    } else {
      // Handle the case where there is no file selected
       console.error('No file selected for upload.');
       alert('No file Selected');
     }
  }


  checkAllDocumentsUploaded() {
    const requiredDocumentTypes = ['Pan Card', 'Adhaar Card', 'Bank Passbook'];

    this.isPanCardUploadDisabled = this.uploadedDocuments['Pan Card'];
    this.isAadhaarCardUploadDisabled = this.uploadedDocuments['Adhaar Card'];
    this.isVoterCardUploadDisabled = this.uploadedDocuments['Bank Passbook'];

    this.isUploadDisabled = requiredDocumentTypes.every(
      (type) => this.uploadedDocuments[type]
    );
  }

  onFileSelected(files: FileList | null, documentType: string) {
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
      // Set the property to true when a file is selected for Aadhaar Card
      if (documentType === 'Aadhaar Card') {
        this.isAadhaarCardFileSelected = true;
        
      }
      if (documentType === 'Bank Passbook') {
        this.isVoterCardFileSelected = true;
      }
      if (documentType === 'Pan Card') {
        this.isPanCardFileSelected = true;
      }
    } else {
      // Handle the case where there is no file selected, e.g., show an error message.
      this.fileToUpload = null;
      console.error('No file selected.');
    }
  }
}
