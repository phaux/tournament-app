import * as React from "react"

/**
 * `Element.prototype.getBoundingClientRect`, but as a hook.
 * @returns element's rect relative to container's position
 */
export function useBoundingRect(
  elementRef: React.RefObject<Element>,
  containerRef: React.RefObject<Element>
) {
  // the computed relative rect
  const [rect, setRect] = React.useState<DOMRectReadOnly>()

  React.useLayoutEffect(() => {
    // if either ref is not set, return undefined
    if (!elementRef.current || !containerRef.current) {
      setRect(undefined)
      return
    }

    const elementRect = elementRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    // compute the new relative rect
    const newRect = new DOMRect(
      elementRect.left - containerRect.left,
      elementRect.top - containerRect.top,
      elementRect.width,
      elementRect.height
    )

    // only update if anything changed to prevent infinite loop
    if (JSON.stringify(rect) !== JSON.stringify(newRect)) {
      setRect(newRect)
    }
  })

  return rect
}
