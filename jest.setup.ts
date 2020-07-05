import "@testing-library/jest-dom/extend-expect"

// polyfills

window.DOMRect = class DOMRect {
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  get left() {
    return this.x + Math.min(0, this.width)
  }
  get right() {
    return this.x + Math.max(0, this.width)
  }
  get top() {
    return this.y + Math.min(0, this.height)
  }
  get bottom() {
    return this.y + Math.max(0, this.height)
  }
} as never
