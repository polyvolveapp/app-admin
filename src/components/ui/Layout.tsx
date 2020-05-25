import * as React from "react"
import cx from "classnames"
import Head from "next/head"
import LoadingBar from "react-redux-loading-bar"

import { Header } from "polyvolve-ui/lib"
import Footer from "./Footer"
import Navigation from "./Navigation"
import Sidebar, { SidebarTitle, SidebarCategory } from "./Sidebar"

import * as style from "../../style/style.scss"
import * as layoutStyle from "../../style/layout.scss"
import UserHeader from "./UserHeader"
import NotificationMessageContainer from "./message/NotificationMessageContainer";

interface Props {
  showSidebarLeft: boolean
  showSidebarRight: boolean
  sidebarLeftComponent: JSX.Element
  sidebarRightComponent: JSX.Element
}

const Layout: React.FunctionComponent<Props> = props =>
  <div>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
    <LoadingBar style={{ backgroundColor: "#00b7ff" }} />
    <NotificationMessageContainer />
    <div id={layoutStyle.layout} className={cx({
      [layoutStyle.leftSidebar]: props.showSidebarLeft,
      [layoutStyle.rightSidebar]: props.showSidebarRight,
      [layoutStyle.noSidebar]: !props.showSidebarLeft && !props.showSidebarRight
    })}>
      <Header className={layoutStyle.headerGrid}>
        <UserHeader className={layoutStyle.userHeaderGrid} />
        <Navigation />
      </Header>
      <Sidebar position="left" className={cx(layoutStyle.sidebarLeftGrid,
        { [layoutStyle.sidebarGridDisabled]: !props.showSidebarLeft })}>
        {props.sidebarLeftComponent}
      </Sidebar>
      <main className={cx(style.page, layoutStyle.contentGrid)}>
        <div className={layoutStyle.content}>
          {props.children}
        </div>
      </main>
      <Sidebar position="right" className={cx(layoutStyle.sidebarRightGrid,
        { [layoutStyle.sidebarGridDisabled]: !props.showSidebarRight })}>
        {props.sidebarRightComponent}
      </Sidebar>
      <Footer className={layoutStyle.footerGrid} />
    </div>
  </div>

export default Layout
