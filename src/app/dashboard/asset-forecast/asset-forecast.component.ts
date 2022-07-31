import { HttpService } from './../../utilities/services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AssetForecastElement, ELEMENT_DATA } from 'src/app/utilities/datasource/datasource';

@Component({
  selector: 'app-asset-forecast',
  templateUrl: './asset-forecast.component.html',
  styleUrls: ['./asset-forecast.component.scss'],
})
export class AssetForecastComponent implements OnInit {
  paginatorList!: HTMLCollectionOf<Element>;
  idx!: number;

  displayedColumns: string[] = [
    'position',
    'modelName',
    'region',
    'manufacturer',
    'demandMonth1',
    'demandMonth2',
    'demandMonth3',
    'demandMonth4',
    'demandMonth5',
    'demandMonth6',
    'modelIdUClassification',
    'leadTime',
    'serviceLevel',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();

  isLoading = true;

  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;

  ELEMENT_DATA_API: AssetForecastElement[] = []

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });

    // TODO: enable block for API
    // this.httpService.getAssets().subscribe((data: AssetForecastElement[]) => {
    //   this.ELEMENT_DATA_API = data;
    //   this.getAllAssets();
    // });

    // TODO: disable block when API call upto line no 96
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val, index) =>
          this.fb.group({
            position: new FormControl(index + 1),
            modelName: new FormControl(val.modelName),
            region: new FormControl(val.region),
            manufacturer: new FormControl(val.manufacturer),
            demandMonth6: new FormControl(val.demandMonth6),
            demandMonth5: new FormControl(val.demandMonth5),
            demandMonth4: new FormControl(val.demandMonth4),
            demandMonth3: new FormControl(val.demandMonth3),
            demandMonth2: new FormControl(val.demandMonth2),
            demandMonth1: new FormControl(val.demandMonth1),
            modelIdUClassification: new FormControl(val.modelIdUClassification),
            leadTime: new FormControl(val.leadTime),
            serviceLevel: new FormControl(val.serviceLevel),
            action: new FormControl('existingRecord'),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    }); // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
    // TODO: disable block upto here

    //Custom filter according to name column
    // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
    //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  goToPage() {
    this.paginator.pageIndex = this.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName(
      'mat-paginator-range-label'
    );

    this.onPaginateChange(this.paginator, this.paginatorList);

    this.paginator.page.subscribe(() => {
      // this is page change event
      this.onPaginateChange(this.paginator, this.paginatorList);
    });
  }

  applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    // this.getBasicDetails();
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls);

    // control.controls.unshift(this.initiateVOForm());
    // this.openPanel(panel);
    // this.table.renderRows();
    // this.dataSource.data = this.dataSource.data;
  }

  DeleteRow(position: number) {
    const control = this.VOForm.get('VORows') as FormArray;
    control.removeAt(0);
    this.dataSource = new MatTableDataSource(control.controls);
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement: FormGroup, i: number) {
    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    //@ts-ignore
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;
  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement: FormGroup, i: number) {
    // alert('SaveVO')
    //@ts-ignore
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    

    if (this.getAction(VOFormElement, i) === 'newRecord') {
      // call save API here
      console.log('save')
      //@ts-ignore
      VOFormElement.get('VORows').at(i).get('isNewRow').patchValue(false);
      //@ts-ignore
      VOFormElement.get('VORows').at(i).get('action').patchValue('existingRecord');

      //@ts-ignore
      const rowValue = VOFormElement.get('VORows').get(i)?.getRawValue();
      this.addAssets(rowValue);

    } else {
      // Call update API here
      console.log('update')
      //@ts-ignore
      const rowValue = VOFormElement.get('VORows').at(i).getRawValue();
      this.updateAssets(rowValue);
    }
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement: FormGroup, i: number) {
    //@ts-ignore
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);

    if (this.getAction(VOFormElement, i) === 'newRecord') {
      // delete record from array
      console.log('delete')
      this.DeleteRow(i);
    }
  }

  getEditable(VOFormElement: FormGroup, i: number) {
    //@ts-ignore
    return VOFormElement.get('VORows').value[i].isEditable;
  }

  getIsNewRow(VOFormElement: FormGroup, i: number) {
    //@ts-ignore
    return VOFormElement.get('VORows').value[i].isNewRow;
  }

  getAction(VOFormElement: FormGroup, i: number) {
    //@ts-ignore
    return VOFormElement.get('VORows').value[i].action;
  }

  onPaginateChange(
    paginator: MatPaginator,
    list: HTMLCollectionOf<Element>
  ): void {
    setTimeout(
      (idx: number) => {
        let from = paginator.pageSize * paginator.pageIndex + 1;

        let to =
          paginator.length < paginator.pageSize * (paginator.pageIndex + 1)
            ? paginator.length
            : paginator.pageSize * (paginator.pageIndex + 1);

        let toFrom = paginator.length == 0 ? 0 : `${from} - ${to}`;
        let pageNumber =
          paginator.length == 0
            ? `0 of 0`
            : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
        let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

        if (list.length >= 1) list[0].innerHTML = rows;
      },
      0,
      paginator.pageIndex
    );
  }

  initiateVOForm(): FormGroup {
    return this.fb.group({
      position: new FormControl(ELEMENT_DATA.length + 1),
      modelName: new FormControl(''),
      region: new FormControl(''),
      manufacturer: new FormControl(''),
      demandMonth6: new FormControl(0),
      demandMonth5: new FormControl(0),
      demandMonth4: new FormControl(0),
      demandMonth3: new FormControl(0),
      demandMonth2: new FormControl(0),
      demandMonth1: new FormControl(0),
      modelIdUClassification: new FormControl(''),
      leadTime: new FormControl(0),
      serviceLevel: new FormControl(0),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }

  getAllAssets() {
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        this.ELEMENT_DATA_API.map((val, index) =>
          this.fb.group({
            position: new FormControl(index + 1),
            modelName: new FormControl(val.modelName),
            region: new FormControl(val.region),
            manufacturer: new FormControl(val.manufacturer),
            demandMonth6: new FormControl(val.demandMonth6),
            demandMonth5: new FormControl(val.demandMonth5),
            demandMonth4: new FormControl(val.demandMonth4),
            demandMonth3: new FormControl(val.demandMonth3),
            demandMonth2: new FormControl(val.demandMonth2),
            demandMonth1: new FormControl(val.demandMonth1),
            modelIdUClassification: new FormControl(val.modelIdUClassification),
            leadTime: new FormControl(val.leadTime),
            serviceLevel: new FormControl(val.serviceLevel),
            action: new FormControl('existingRecord'),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    }); // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
  }

  // Update Assets data
  updateAssets(element: AssetForecastElement) {
    if(window.confirm('Are you sure, you want to update?')){
      // @ts-ignore
      this.httpService.updateAsset(element['id'], element).subscribe(data => {
        // show success message from here
      })
    }
  }

  addAssets(element: AssetForecastElement) {
   this.httpService.createAsset(element).subscribe((data: {}) => {
      // show success message from here
    });
  }
}
