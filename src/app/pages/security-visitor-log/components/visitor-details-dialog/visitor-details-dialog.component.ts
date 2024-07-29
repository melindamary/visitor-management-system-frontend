import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { VisitorLog } from '../../../../core/models/visitor-log.interface';

@Component({
  selector: 'app-visitor-details-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './visitor-details-dialog.component.html',
  styleUrl: './visitor-details-dialog.component.scss'
})
export class VisitorDetailsDialogComponent {
  @Input() visible = false;
  @Input() visitor: VisitorLog = {} as VisitorLog;
  @Input() currentTab: string = 'upcoming';
  @Output() visibleChange = new EventEmitter<boolean>();
  onDialogHide(): void {
    this.visibleChange.emit(false);
  }
}
