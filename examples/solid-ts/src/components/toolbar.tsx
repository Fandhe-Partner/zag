import { dataAttr } from "@zag-js/dom-query"
import { createSignal, JSX } from "solid-js"
import { UseControlsReturn } from "~/hooks/use-controls"
import { Controls } from "./controls"

type ToolbarProps = {
  controls?: UseControlsReturn | null
  children?: JSX.Element
  viz?: boolean
}

export function Toolbar(props: ToolbarProps) {
  const [active, setActive] = createSignal(props.viz ? 1 : !props.controls ? 1 : 0)

  return (
    <div class="toolbar">
      <nav>
        {props.controls && (
          <button data-active={dataAttr(active() === 0)} onClick={() => setActive(0)}>
            Controls
          </button>
        )}
        <button data-active={dataAttr(active() === 1)} onClick={() => setActive(1)}>
          Visualizer
        </button>
      </nav>
      <div>
        {props.controls && (
          <div data-content data-active={dataAttr(active() === 0)}>
            <Controls store={props.controls} />
          </div>
        )}
        <div data-content data-active={dataAttr(active() === 1)}>
          {props.children}
        </div>
      </div>
    </div>
  )
}
