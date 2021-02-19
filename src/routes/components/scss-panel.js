import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import _ from 'lodash';

@inject(EventAggregator)
export class ScssPanel {
  
  colorLists = [];

  constructor(ea) {
    this.ea = ea;
    this.loadColor = this.loadColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }

  attached() {
    this.subscribers = [
      this.ea.subscribe('load-colors', this.loadColor),
      this.ea.subscribe('remove-colors', this.removeColor)
    ];
  }

  detached() {
    _.each(this.subscribers, s => s.dispose());
  }

  loadColor(data) {
    const existing = _.findIndex(this.colorLists, (color) => { 
      return (color.hex === data.hex) && (color.name === data.name) 
    });

    if (existing == -1) {
      this.colorLists.push(data);
    } 
  }

  removeColor(data) {
    _.remove(this.colorLists, (color) => { 
      return (color.hex === data.hex) && (color.name === data.name) 
    });
  }
}