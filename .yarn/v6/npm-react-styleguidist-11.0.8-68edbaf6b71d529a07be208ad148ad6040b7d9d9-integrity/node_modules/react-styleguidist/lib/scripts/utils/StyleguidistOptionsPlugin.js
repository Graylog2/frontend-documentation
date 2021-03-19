"use strict";

exports.__esModule = true;
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Webpack plugin that makes Styleguidist config available for Styleguidist webpack loaders.
// It will be available as `this._styleguidist`.
//
// Other working in webpack 2 way is to use LoaderOptionsPlugin, but it has problems.
// See this issue for details: https://github.com/styleguidist/react-styleguidist/issues/328
class StyleguidistOptionsPlugin {
  constructor(options) {
    _defineProperty(this, "options", void 0);

    this.options = options;
    this.plugin = this.plugin.bind(this);
  }

  plugin(compil) {
    const pluginFunc = (context, module) => {
      if (!module.resource) {
        return;
      }

      context._styleguidist = this.options;
    };

    compil.hooks.normalModuleLoader.tap('StyleguidistOptionsPlugin', pluginFunc);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
  }

}

exports.default = StyleguidistOptionsPlugin;