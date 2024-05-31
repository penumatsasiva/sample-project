import { Component, OnInit } from '@angular/core';
import { ColDef ,RowClassRules,SelectionChangedEvent,GridApi,SideBarDef,GridReadyEvent,GetRowIdFunc,IAggFunc,CellEditRequestEvent,CellValueChangedEvent,RowValueChangedEvent} from 'ag-grid-community'; 
import { CellButtonComponent } from './cell-button/cell-button.component';
interface ICar {
  id?: number,
  make?: string, model?: string, price?: number,discount?:number, electric?: boolean 
}
@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss']
})


export class BasicGridComponent implements OnInit {

  private gridAPi!:GridApi;
  // public getRowId: GetRowIdFunc = (params: GetRowIdFunc<ICar>) =>
  //   params.data.id
  constructor() { }

  ngOnInit(): void {
  }
  public  aggFuncs: {
    [key: string]: IAggFunc;
  } = {
    'mySum': params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return sum;
    }
};

  public columnTypes:Record<string,ColDef>={
    currency:{
      valueFormatter:params=>  '£ ' + params.value
    }
  }
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
        },
      },
    ],
  };
  rowData :ICar[]= [
    { id:1,make: "Tesla", model: "Model Y ", price: 64950,discount:5000, electric: true },
    { id:2,make: "Ford", model: "F-Series", price: 33850, discount:5000,electric: false },
    { id:3,make: "Toyota", model: "Etios Liva", price: 300000, discount:5000,electric: false }];

    public defaultColDef: ColDef = {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      aggFunc: "mySum" ,
      // headerComponent: MyHeaderComponent
      // cellEditor: 'agTextCellEditor' 
    //   cellEditorParams: {
    //     // make "country" value available to cell editor
    //     country: 'Ireland'
    // },
    // cellEditor: 'agLargeTextCellEditor',
    //     cellEditorPopup: true,
    //     cellEditorParams: {
    //         maxLength: 100
    //     }
    //     cellEditor: 'agSelectCellEditor',
    //     cellEditorParams: {
    //         values: ['English', 'Spanish', 'French', 'Portuguese', '(other)'],
    //     }
    // cellEditor: 'agDateCellEditor',
    // cellEditorParams: {
    //     min: '2000-01-01',
    //     min: '2019-12-31',
    // }
    // cellRenderer: 'agCheckboxCellRenderer',
    //     cellEditor: 'agCheckboxCellEditor',
      resizable: true ,
      flex:1
    };
  colDefs: ColDef[] = [
    { field: "make", editable:true,checkboxSelection: true,initialPinned: 'left'},
    { field: "model",filter:true,         colSpan: params => params.data.make === 'Toyota' ? 2 : 1,
  },
    { field: "price" ,valueFormatter:params=>  '£ ' + params.value , valueParser: params => Number(params.newValue)},
    { field: "discount" , type:['currency']},
    { field: "makeModel" ,valueGetter:p=>p.getValue('make') +' '+p.getValue('model')},
    { field: "electric", cellClassRules:{'grid-cell-bg-color':(params)=>params.value===true}},
    { field: "action",cellRenderer:CellButtonComponent }
  ];
  colDefsSimple: ColDef[] = [
    { field: "make", editable:true,checkboxSelection: true,initialPinned: 'left' },
    { field: "model",filter:true, },
    { field: "price" ,valueFormatter:params=>  '£ ' + params.value },
    { field: "action",cellRenderer:CellButtonComponent }
  ];
  public classRules:RowClassRules={'grid-row-bg-color':(params)=>params.data.make=="Ford"}
  public rowSelection(data:SelectionChangedEvent){
console.log(data.api.getSelectedRows())
  }
  addColumns(){
this.gridAPi.setGridOption('rowData', [
  { make: "Tesla", model: "Model Y ", price: 64950,discount:5000, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, discount:5000,electric: false },
  { make: "Toyota", model: "Etios Liva", price: 300000, discount:5000,electric: false }])
  }
  excludeColumns(){
    this.gridAPi.setGridOption('rowData', [
      { make: "Tesla", model: "Model Y ", price: 64950,discount:5000, electric: true },
      { make: "Ford", model: "t-Series", price: 33850, discount:5000,electric: false },
      { make: "Ford", model: "h-Seeeries", price: 33850, discount:5000,electric: false },
      { make: "Ford", model: "t-Series", price: 33850, discount:5000,electric: false },
      { make: "Toyota", model: "Etios Liva", price: 300000, discount:5000,electric: false }])
  }
  onGridReady(params: GridReadyEvent<any>) {
    this.gridAPi = params.api;
  }
  
  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
    );
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data;
    console.log(
      "onRowValueChanged: (" +
        data.make +
        ", " +
        data.model +
        ", " +
        data.price +
        ", " +
        data.field5 +
        ")",
    );
  }
  onCellEditRequest(event: CellEditRequestEvent) {
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
   // const oldItem = rowImmutableStore.find((row) => row.id === data.id);
    // if (!oldItem || !field) {
    //   return;
    // }
    // const newItem = { ...oldItem };
    // newItem[field] = newValue;
    console.log("onCellEditRequest, updating " + field + " to " + newValue);
    
  
  }
}
