import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sku-browser',
  templateUrl: './sku-browser.component.html',
  styleUrls: ['./sku-browser.component.scss']
})
export class SkuBrowserComponent implements OnInit {
  equipList: any;
  equipMList: any;
  equipTypeList: any;
  eqManFilteredList: any;
  eqTypeFilteredList: any;
  eqModelFilteredList: any;
  floatLabelControl: any;
  searchText: any;
  userId: any;
  bgManId: any;
  bgTypeId: any;
  bgModelId: any;
  skuNumner:any;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    const userDetails = JSON.parse(sessionStorage.getItem('user')!)
    this.userId = userDetails?.user_id

    this.dataService.getEquipManufacturer({ user_id: this.userId }).subscribe((data: any) => {
      console.log("Equip Manufacturer list---", data)
      this.equipList = data;
      this.eqManFilteredList = this.equipList
      // this.eqTypeFilteredList = this.equipList
      // this.eqModelFilteredList = this.equipList
      // console.log("First equip manufacturer----", this.eqManFilteredList[0])

    })

    this.dataService.getEquipType({ user_id: this.userId }).subscribe((data: any) => {
      console.log("Equip Type list---", data)
      this.equipTypeList = data;
      // this.eqManFilteredList = this.equipList
      this.eqTypeFilteredList = this.equipTypeList
      // this.eqModelFilteredList = this.equipList
      // console.log("First equip manufacturer----", this.eqManFilteredList[0])

    })
    this.getEquipList()
  }

  getEquipList() {
    this.dataService.getequipmentData({ user_id: this.userId }).subscribe((data: any) => {
      console.log("Equip list---", data)
      this.equipMList = data;
      // this.eqManFilteredList = this.equipList
      // this.eqTypeFilteredList = this.equipList
      this.eqModelFilteredList = this.equipMList
      // console.log("First equip manufacturer----", this.eqManFilteredList[0])

    })
  }

  onSearchEquip(ev: any) {
    if (this.floatLabelControl === 'manufacturer') {
      this.onSearchMan(ev.target.value)
    }
    else if (this.floatLabelControl === 'equip_type_id') {
      this.onSearchType(ev.target.value)
    }
    else if (this.floatLabelControl === 'model') {
      this.onSearchModel(ev.target.value)
    }
  }

  onSearchMan(ev: any) {
    const filterValue = ev.target.value;

    if (!filterValue) {
      this.eqManFilteredList = this.equipList;
    } else {
      this.eqManFilteredList = this.equipList?.filter((item: any) =>
        item.manufacturer.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
    }

  }

  onSearchType(ev: any) {
    const filterValue = ev.target.value;

    if (!filterValue) {
      this.eqTypeFilteredList = this.equipTypeList;
    } else {
      this.eqTypeFilteredList = this.equipTypeList?.filter((item: any) =>
        item.equip_type_id.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
    }

  }

  onSearchModel(ev: any) {
    const filterValue = ev.target.value;

    if (!filterValue) {
      this.eqModelFilteredList = this.equipList;
    } else {
      this.eqModelFilteredList = this.equipList?.filter((item: any) =>
        item.model.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
    }

  }

  onEqManuClick(ev: any, data: any) {    
    this.bgTypeId = null;
    this.bgModelId = null;
    this.getEquipList();
    
    if (this.bgManId) {
      console.log(this.bgManId)
      const myDiv = (document.getElementById(`man-${this.bgManId}`) as HTMLInputElement);
      myDiv.style.removeProperty("background-color")
    }
    this.bgManId = data.id
    const myDiv = (document.getElementById(`man-${data.id}`) as HTMLInputElement);
    myDiv.style.backgroundColor = '#cec1e7';
    console.log(ev.target.parentElement)

    this.dataService.getEquipTypeByManufacturer({manufacturer: data.manufacturer, user_id: this.userId }).subscribe((data: any) => {
      console.log("Equip Type list by manufacturer---", data)
      this.equipTypeList = data;
      // this.eqManFilteredList = this.equipList
      this.eqTypeFilteredList = this.equipTypeList
      // this.eqModelFilteredList = this.equipList
      // console.log("First equip manufacturer----", this.eqManFilteredList[0])

    })

    // this.eqTypeFilteredList = this.equipTypeList?.filter((item: any) =>
    //   item.manufacturer.toLowerCase().indexOf(data.manufacturer.toLowerCase()) !== -1);

    // this.eqModelFilteredList = this.equipList?.filter((item: any) =>
    //   item.manufacturer.toLowerCase().indexOf(data.manufacturer.toLowerCase()) !== -1);
  }

  onEqTypeClick(ev: any, data: any) {
    // ev.target.style.backgroundColor = "#e0e0e0 ";
    if (this.bgTypeId) {
      console.log(this.bgTypeId)
      const myDiv = (document.getElementById(`type-${this.bgTypeId}`) as HTMLInputElement);
      myDiv.style.removeProperty("background-color")
    }
    this.bgTypeId = data.id
    const myDiv = (document.getElementById(`type-${data.id}`) as HTMLInputElement);
    myDiv.style.backgroundColor = '#cec1e7';
    console.log(ev.target.parentElement)

    this.eqModelFilteredList = this.equipList?.filter((item: any) =>
      item.equip_type_id.toLowerCase().indexOf(data.equip_type_id.toLowerCase()) !== -1);
  }

  onModelClick(ev: any, data: any) {
    // ev.target.style.backgroundColor = "#e0e0e0 ";
    if (this.bgModelId) {
      console.log(this.bgModelId)
      const myDiv = (document.getElementById(`model-${this.bgModelId}`) as HTMLInputElement);
      myDiv.style.removeProperty("background-color")
    }
    this.bgModelId = data.id
    const myDiv = (document.getElementById(`model-${data.id}`) as HTMLInputElement);
    myDiv.style.backgroundColor = '#cec1e7';
    this.skuNumner = data.sku_number;
    console.log(this.skuNumner)

    // this.eqModelFilteredList = this.equipList?.filter((item: any) =>
    //   item.equip_type_id.toLowerCase().indexOf(data.equip_type_id.toLowerCase()) !== -1);
  }

  resetFilter() {
    this.ngOnInit();
    this.skuNumner = null;
    this.bgManId = null;
    this.bgTypeId = null;
    this.bgModelId = null;
  }

}
