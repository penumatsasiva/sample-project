import { Component, OnInit } from '@angular/core';
import { ColDef ,IRow,RowClassRules,SelectionChangedEvent,GridApi,SideBarDef,GridReadyEvent,GetRowIdFunc,IAggFunc,CellEditRequestEvent,CellValueChangedEvent,RowValueChangedEvent} from 'ag-grid-community'; 

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  rowData: any[] = [];
  colDefs: ColDef[] = [
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "price" },
    { field: "successful" },
    { field: "rocket" }
  ];
  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/space-mission-data.json')
      .subscribe(data => this.rowData = data);
   }
  // ...
  constructor() { }

  ngOnInit(): void {
  }

}
