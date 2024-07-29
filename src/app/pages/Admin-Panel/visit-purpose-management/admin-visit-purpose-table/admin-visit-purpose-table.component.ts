import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared-components/table/table.component';
import { VisitPurposeService } from '../../../../core/services/visit-purpose-services/visit-purpose.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface VisitPurpose {
  slNo: number;
  name: string;
  createdDate: Date;
  status: string;
  isEditing?: boolean;
}
@Component({
  selector: 'app-admin-visit-purpose-table',
  standalone: true,
  imports: [TableComponent, ButtonModule, DialogModule, NgIf, FormsModule],
  templateUrl: './admin-visit-purpose-table.component.html',
  styleUrl: './admin-visit-purpose-table.component.scss'
})
export class AdminVisitPurposeTableComponent {

  constructor(private visitPurposeService: VisitPurposeService){}

  visitPurposes:VisitPurpose[] = [];
  columns: any[] = [
    { header: 'Sl.No', field: 'slNo'},
    { header: 'Visit Purpose', field: 'name'},
    { header: 'Created On', field: 'createdDate'},
    { header: 'Last Modified By', field: 'lastModifiedBy'},
    { header: 'Last Modified On', field: 'lastModifiedOn'},
    { header: 'Approval Status', field:'status'},
    { header: 'Actions', field: 'actions'},
  ];
  isEditModalVisible: boolean = false;
  selectedPurpose: any;

  async getVisitPurposes():Promise<void>{
    this.visitPurposes = await this.visitPurposeService.getVisitPurposes();
    this.visitPurposes.forEach(item => item.isEditing = false);
    console.log("Entered Visit Purposes: ",this.visitPurposes);
  }

  openEditModal(purpose: any) {
    this.selectedPurpose = { ...purpose }; // Create a copy of the object to avoid direct mutation
    this.isEditModalVisible = true;
  }
  closeDialog() {
    this.isEditModalVisible = false;
  }
  editRow(rowIndex: number) {
    this.visitPurposes[rowIndex].isEditing = true;
  }
  saveEdit() {
    var response = this.visitPurposeService.updatePurpose(this.selectedPurpose.id, this.selectedPurpose.name).subscribe();
    console.log(response);

    // Close the dialog
    this.isEditModalVisible = false;
    this.selectedPurpose = null;
  }
  deletePurpose(id: number){
    var response = this.visitPurposeService.deletePurpose(id).subscribe();
    console.log(response);
  }
  ngOnInit(){
    this.getVisitPurposes();
  }
}
