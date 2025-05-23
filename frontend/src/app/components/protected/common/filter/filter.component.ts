
/*
 * Copyright (c) 2023 Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Search textbox for filtering stuff in general.
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  @Output() filterList = new EventEmitter<any>();
  @Output() buttonClick = new EventEmitter();
  @Output() button2Click = new EventEmitter();
  @Output() button3Click = new EventEmitter();
  @Input() types: string[];
  @Input() type: string;
  @Output() typeChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() checkBoxText: string = null;
  @Input() checkBoxTooltip: string = null;
  @Input() buttonText: string = null;
  @Input() button2Text: string = null;
  @Input() button3Text: string = null;
  @Input() buttonTooltip: string = null;
  @Input() button2Tooltip: string = null;
  @Input() button3Tooltip: string = null;
  @Input() buttonIcon: string = null;
  @Input() buttonDisabled: boolean = false;
  @Input() button2Disabled: boolean = false;
  @Input() button3Disabled: boolean = false;
  @Input() set disableSearchTextBox( condition : boolean ) {
    this.disabledInitially = condition;
    if (this.filterControl) {
      if (condition) {
        this.filterControl.disable();
      } else {
        this.filterControl.enable();
      }
    }
  }

  filterControl: FormControl;
  checked: boolean = false;
  disabledInitially: boolean = false;

  ngOnInit() {

    this.filterControl = new FormControl('');
    if (this.disabledInitially) {
      this.filterControl.disable();
    }
    this.filterControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.filter();
      });
  }

  setSearchTerm(query: string) {

    this.filterControl.setValue(query);
  }

  removeSearchTerm() {

    this.filterControl.setValue('');
  }

  filter() {

    const filter: any = {};
    if (this.filterControl.value?.length > 0) {
      filter.searchKey = this.filterControl.value;
    }
    if (this.type) {
      filter.type = this.type;
    }
    if (this.checkBoxText) {
      filter.checked = this.checked;
    }
    this.filterList.emit(filter);
  }

  typeChanged() {

    this.typeChange?.emit(this.type);
  }

  buttonClicked() {

    this.buttonClick.emit();
  }

  button2Clicked() {

    this.button2Click.emit();
  }

  button3Clicked() {

    this.button3Click.emit();
  }
}
