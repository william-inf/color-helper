import {bindable,computedFrom} from 'aurelia-framework';
import Color from 'color';
import _ from 'lodash'

export class ColorPanel {
  @bindable name = null;
  @bindable hex = null;
  
  colorProfile = []
  iterations = 3;

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
  }

  @computedFrom('colorProfile')
  get first() {
    return _.first(this.colorProfile)
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