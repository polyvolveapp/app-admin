import * as React from "react"
import { NavigationItem } from "../utils"

import * as navStyle from "../../style//nav.module.scss"
import * as settingsIcon from "../../assets/icons/settings.svg"
import Search from "../utils/Search"

const Navigation: React.FunctionComponent = () => (
  <nav className={navStyle.navContainer}>
    <div className={navStyle.navRight}>
      <Search />
      <ul className={navStyle.navRightList}>
        <NavigationItem url="/settings" icon={settingsIcon} />
      </ul>
    </div>
    <div className={navStyle.navCenter}>
      <ul className={navStyle.navCenterList}>
        <NavigationItem name="Dashboard" url="/" />
        <NavigationItem name="Users" url="/overview/user" />
        <NavigationItem name="Teams" url="/overview/team" />
        <NavigationItem name="Review Masters" url="/overview/reviewmaster" />
        <NavigationItem name="Schema Editor" url="/schema" />
      </ul>
    </div>
  </nav>
)

export default Navigation
