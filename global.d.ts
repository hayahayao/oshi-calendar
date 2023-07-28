import React from 'react'

declare module 'react' {
  // extend CSSProperties
  interface CSSProperties {
    '--liver-main-color'?: string
    '--liver-highlight-color'?: string
  }
}
