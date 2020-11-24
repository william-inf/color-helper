import { inject, bindable, bindingMode, computedFrom } from 'aurelia-framework';
import _ from 'lodash';

@inject('Validation')
export class AddColor {
  
  @bindable({defaultBindingMode: bindingMode.twoWay}) colorList = null;

  model = {
    name: '',
    hex: ''
  }

  triedOnce = false;

  constructor(validation) {
    this.validator = validation.generateValidator({
      name: ['mandatory'],
      hex: 'mandatory'
    });
  }

  addColor() {
    this.triedOnce = true;

    if (this.hasError) return;

    this.colorList.push(this.model)
    
    this.triedOnce = false;
    this.model = {
      name: '',
      hex: ''
    };
  }

  @computedFrom('triedOnce', 'name', 'hex')
  get errors() {
      if (!this.triedOnce) return {};
      return this.validator(this.model) || {};
  }

  @computedFrom('errors')
  get hasError() {
      return !_.isEmpty(this.errors);
  }
  
}