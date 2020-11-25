import {bindable, computedFrom} from 'aurelia-framework';
import Color from 'color';
import _ from 'lodash'

export class ColorPanel {
  @bindable name = null;
  @bindable hex = null;
  
  iterations = 3;

  @computedFrom('hex', 'iterations')
  get colorProfile() {
    let profile = []
    let color = Color(this.hex);
    let factor = 1.0 / this.iterations;
    let totalCount = (2 * this.iterations) - 1;

    _.times(this.iterations, (idx) => {
      let fact = 1 - (factor * idx);
      
      if (fact < 1) {
        profile.push({
          hex: color.darken(fact).hex(),
          name: `${this.name}-${totalCount * 100}`
        });

        totalCount -= 1;
      }
    });

    _.times(this.iterations, (idx) => {
      profile.push({
        hex: color.lighten(factor * idx).hex(),
        name: `${this.name}-${totalCount * 100}`
      });

      totalCount -= 1;
    })

    return profile
  }

  addIteration() {
    this.iterations += 1;
  }

  subtractIteration() {
    if (this.iterations > 1) {
      this.iterations -= 1
    }
  }

}