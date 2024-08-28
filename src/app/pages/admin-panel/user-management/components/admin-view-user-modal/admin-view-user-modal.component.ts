import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-view-user-modal',
  standalone: true,
  imports: [DialogModule, NgFor, NgIf],
  templateUrl: './admin-view-user-modal.component.html',
  styleUrl: './admin-view-user-modal.component.scss'
})
export class AdminViewUserModalComponent {
  @Input() viewDetailsDialog: boolean = false;
  @Input() userDetails: any = {};
  @Output() closeDialog = new EventEmitter<void>();

  close() {
    this.viewDetailsDialog = false;
    this.closeDialog.emit();  // Emit the event to notify the parent component
  }
}
