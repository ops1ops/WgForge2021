const ALLOWED_TAGS = [
  {
    tag: 'div',
    isSelfClosing: false,
  },
  {
    tag: 'span',
    isSelfClosing: false,
  },
  {
    tag: 'br',
    isSelfClosing: true,
  },
  {
    tag: 'p',
    isSelfClosing: false,
  }
];

class Templater {
  constructor() {
    this.html = '';

    ALLOWED_TAGS.forEach((tagData) => {
      this[tagData.tag] = (...args) => this._createTagWithNesting(tagData, ...args);
    })
  }

  static attributesToString(attributes) {
    const sortedKeys = Object.keys(attributes).sort();

    return sortedKeys.reduce((accumulator, key) => `${accumulator} ${key}="${attributes[key]}"`, '');
  }

  _createTag(tag, content, isSelfClosing = false, attributes = {}) {
    if (content && isSelfClosing) {
      throw new Error('Nested content is not allowed');
    }

    const endPart = isSelfClosing ? '' : `${content}</${tag}>`;
    const tagAttributes = Templater.attributesToString(attributes);

    this.html += `<${tag}${tagAttributes}>${endPart}`;
  }

  _createTagWithNesting({ tag, isSelfClosing = false }, ...args) {
    let attributes;

    const content = args.reduce((accumulator, argument, index) => {
      if (typeof argument === 'string') {
        return accumulator + argument;
      } else if (argument instanceof Templater) {
        return accumulator + argument.toString();
      } else if (index === args.length - 1) { // attributes object is always last
        attributes = argument;

        return accumulator;
      }
    }, '');

    this._createTag(tag, content, isSelfClosing, attributes);

    return this;
  }

  toString() {
    return this.html;
  }
}

module.exports = function() {
  return new Templater()
}
