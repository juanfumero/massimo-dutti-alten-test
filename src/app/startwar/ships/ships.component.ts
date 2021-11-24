import { ShipsService } from './../services/ships.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IFileConfig } from 'src/app/shared/fileConfig';
import { Workbook } from 'exceljs';
@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})

// const ExcelJS = require('exceljs');
export class ShipsComponent implements OnInit {

  myResultadoStart: any[] = [];
  valorGlobal: any = null;
  workbook = new Workbook();
  @ViewChild('downloadFileLink', { static: true }) downloadFileLinkElement: ElementRef;
  constructor(private myShipService: ShipsService) { }

  title = 'Car Sell Report';
  header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
  data = [
      [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
      [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
      [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
      [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
      [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4]
    ];

  ngOnInit(): void {
    this.myShipService.getListOdfBloque().subscribe(ship => {
      if(ship){
        this.myResultadoStart = ship.results;
        this.valorGlobal = ship;
      }
    });


    let worksheet = this.workbook.addWorksheet('Car Data');

    let titleRow = worksheet.addRow([this.title]);
    // Set font, size and style in title row.
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // Blank Row
    worksheet.addRow([]);
    //Add row with current date
    let subTitleRow = worksheet.addRow(['Date : ' + new Date()]);
    worksheet.mergeCells('A1:D2');

    //Add Header Row
    let headerRow = worksheet.addRow(this.header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    // Add Data and Conditional Formatting
    this.data.forEach(d => {
        let row = worksheet.addRow(d);
        let qty = row.getCell(5);
        let color = 'FF99FF99';
        if (+qty.value < 500) {
          color = 'FF9999'
        }
        qty.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        }
      }
      );
    //  worksheet.addRows(this.data);
  }

  reCallgetListOdfBloque() {
    //localStorage.removeItem('protectApi');
    //let variable = this.getWithExpiry('protectApi');
    //if(variable) {
      this.myShipService.getListOdfBloque().subscribe(shipBloque => {
        if(shipBloque){
          this.myResultadoStart = shipBloque.results;
          this.valorGlobal = shipBloque;
          //this.setWithExpiry('protectApi', false, 5);
        }
      });
    //}

  }

  descargarExcel() {
    let blob;
    this.workbook.xlsx.writeBuffer().then((data) => {
      blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      this._downloadFile(blob);
    });

  }

  private _downloadFile(blob) {
    // download the file
    try {
      const url = window.URL.createObjectURL(blob); // creates fake url with the blob data
      this.downloadFileLinkElement.nativeElement.href = url;
      this.downloadFileLinkElement.nativeElement.download = 'prueba'; // add item name -> needed for extension
      this.downloadFileLinkElement.nativeElement.click(); // executes download
      window.URL.revokeObjectURL(url); // removes fake url
    } catch (e) {
    }
  }

  downloadFile(blobData, file: IFileConfig) {
    // open file in a new tab
    try {
      const blob = new Blob([blobData], { type: file.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      if (file.name) {
        link.download = file.name;
      } else {
        const today = new Date();
        link.download =  `file-${today.getTime()}.${file.extension}`;
      }
      document.body.appendChild(link); // required in FF, optional for Chrome
      link.click();

      setTimeout(() => {// For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(url); // removes fake url
        link.remove();
      }, 100);
    } catch (e) {
    }
  }

  nextResult() {
    if(this.valorGlobal.next !== null) {
      this.myShipService.getListNextOrPreview(this.valorGlobal.next).subscribe(next => {
        if(next){
          this.myResultadoStart = next.results;
          this.valorGlobal = next;
        }
      })
    }
  }

  previewResult() {
    if(this.valorGlobal.previous !== null) {
      this.myShipService.getListNextOrPreview(this.valorGlobal.previous).subscribe(previous => {
        if(previous){
          this.myResultadoStart = previous.results;
          this.valorGlobal = previous;
        }
      })
    }
  }


  setWithExpiry(key, value, ttl) {
    const now = new Date();
      const item = {
      value: value,
      expiry: now.getMinutes() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return true
    }
    const item = JSON.parse(itemStr)
    const now = new Date();
    if (now.getMinutes() > item.expiry) {
      localStorage.removeItem(key);
      return true
    }
    return item.value
  }

}
