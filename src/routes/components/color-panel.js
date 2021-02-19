import {inject,bindable,computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import Color from 'color';
import _ from 'lodash'


@inject(EventAggregator)
export class ColorPanel {
  @bindable name = null;
  @bindable hex = null;
  
  colorProfile = []
  iterations = 5;

  constructor(ea) {
    this.ea = ea;
  }

  bind() {
    this.generateColorProfile()
  }

  generateColorProfile() {
    this.colorProfile = [];

    let color = Color(this.hex);
    
    let factor = 1.0 / this.iterations;
    let totalCount = (2 * this.iterations) - 1;

    _.times(this.iterations, (idx) => {
      let fact = 1 - (factor * idx);
      
      if (fact < 1) {
        this.colorProfile.push({
          hex: color.darken(fact).hex(),
          name: `${this.name}-${totalCount * 100}`
        });

        totalCount -= 1;
      }
    });

    _.times(this.iterations, (idx) => {
      this.colorProfile.push({
        hex: color.lighten(factor * idx).hex(),
        name: `${this.name}-${totalCount * 100}`
      });

      totalCount -= 1;
    })

    this.ea.publish('load-colors', {
      colorProfile: this.colorProfile,
      name: this.name,
      hex: this.hex
    });
  }

  @computedFrom('colorProfile')
  get first() {
    return _.first(this.colorProfile)
  }

  @computedFrom('colorProfile')
  get last() {
    return _.last(this.colorProfile)
  }

  @computedFrom('hex')
  get rgb() {
    return Color(this.hex).hex();
  }

  @computedFrom('hex')
  get isDark() {
    return (Color(this.hex).luminosity() <= 0.5)
  }

  addIteration() {
    this.iterations += 1;
    this.generateColorProfile();
  }

  subtractIteration() {
    if (this.iterations > 1) {
      this.iterations -= 1
      this.generateColorProfile();
    }
  }

}