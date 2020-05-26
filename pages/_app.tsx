import "isomorphic-fetch"
import * as React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import { getStore } from "../src/store"

import "../src/style/vars.scss"
import * as style from "../src/style/style.scss"
import * as componentStyle from "../src/style/component.scss"
import "polyvolve-ui/style/style.scss"

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    const server = !!ctx.req
    const store = getStore(undefined, server)
    const state = store.getState()
    const out = { state, server } as any

    if (Component.getInitialProps) {
      return {
        ...out,
        pageProps: {
          ...(await Component.getInitialProps(ctx)),
        },
      }
    }

    return out
  }

  render() {
    const { props } = this as any
    const { Component, pageProps } = props

    return (
      <Provider store={getStore(undefined, props.server)}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export { style, componentStyle }
