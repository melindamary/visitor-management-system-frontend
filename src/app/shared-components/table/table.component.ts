import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  {
  @Input() dataSource: any[] = [];
  @Input() columnsToDisplay: any[] = [];
  @Input() rows: number = 5;
  @Input() totalItems: number = 0;
  @Input() actionsTemplate: TemplateRef<any> | null = null;
  @Input() summaryTemplate: TemplateRef<any> | null = null;
<<<<<<< HEAD
=======

>>>>>>> origin/user-management-branch
  
}
