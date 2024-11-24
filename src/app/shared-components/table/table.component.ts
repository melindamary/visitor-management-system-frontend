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
  @Input() rowsPerPageOptions: number[] = [5];
  @Input() scrollHeight: string = "70vh";
  @Input() tableStyle = { 'min-width': '60rem', 'min-height': '' };
  @Input() statusTemplate: TemplateRef<any> | null = null;
  @Input() actionsTemplate: TemplateRef<any> | null = null;
  @Input() summaryTemplate: TemplateRef<any> | null = null;

  searchTerms: { [key: string]: string } = {};
  
}
