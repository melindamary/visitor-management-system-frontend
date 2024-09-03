import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-visitor-log-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitor-log-tiles.component.html',
  styleUrl: './visitor-log-tiles.component.scss'
})
export class VisitorLogTilesComponent {
  @Input() header: string = '';
  @Input() title: string = '';
  @Input() content: string | number = '';
  @Input() backgroundColor: string = '#000000';

  @Output() tileClick = new EventEmitter<void>();

  onClick() {
    this.tileClick.emit();
  }
}
