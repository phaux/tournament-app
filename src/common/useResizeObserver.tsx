import * as React from "react"

// missing TS declaration: https://github.com/microsoft/TypeScript/issues/37861
declare global {
  class ResizeObserver {
    constructor(callback: (entries: unknown[]) => void)
    disconnect: () => void
    observe: (target: Element) => void
    unobserve: (target: Element) => void
  }

  interface Window {
    ResizeObserver?: ResizeObserver
  }
}

/** Forces rerender on element resize */
export function useResizeObserver(elementRef: React.RefObject<Element>) {
  const forceRerender = React.useReducer((x: boolean) => !x, false)[1]

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // give up when not supported
    if (!window.ResizeObserver) return

    // declare an observer which rerenders on resize
    const observer = new ResizeObserver(() => {
      forceRerender()
    })

    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [elementRef])
}
