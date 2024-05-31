import { Component, OnInit } from '@angular/core';
import { ColDef ,RowClassRules,SelectionChangedEvent,GridApi,SideBarDef,GridReadyEvent,GetRowIdFunc,IAggFunc,CellEditRequestEvent,CellValueChangedEvent,RowValueChangedEvent} from 'ag-grid-community'; 
import { SearchServiceService } from '../search-service.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  rowData= [];
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
   this.service.getGridData()
      .subscribe((data:any) => this.rowData = data);
   }
  // ...
  constructor(private service:SearchServiceService) { }

  ngOnInit(): void {
  }

}
