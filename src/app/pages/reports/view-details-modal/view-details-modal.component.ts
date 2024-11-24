import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-details-modal',
  standalone: true,
  imports: [DialogModule, NgFor, NgIf],
  templateUrl: './view-details-modal.component.html',
  styleUrl: './view-details-modal.component.scss'
})
export class ViewDetailsModalComponent {
  @Input() viewDetailsDialog: boolean = false;
  @Input() visitorDetails: any = {};
  @Output() closeDialog = new EventEmitter<void>();

  close() {
    this.viewDetailsDialog = false;
    this.closeDialog.emit();  // Emit the event to notify the parent component
  }

  
}
  
