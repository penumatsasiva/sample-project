import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community'; 
@Component({
  selector: 'app-cell-button',
  templateUrl: './cell-button.component.html',
  styleUrls: ['./cell-button.component.scss']
})
export class CellButtonComponent implements OnInit , ICellRendererAngularComp {
public params:any
  constructor() { }
  agInit(params: ICellRendererParams): void {
this.params=params;

  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  ngOnInit(): void {
  }
  buttonClicked() {
    alert("clicked");
  }
}
