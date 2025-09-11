// Vue SFC type support
/// <reference types="vite/client" />
import type { DefineComponent } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-types
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
