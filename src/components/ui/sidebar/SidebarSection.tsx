import * as React from "react"

import * as style from "../../../style/sidebar.scss"

const SidebarSection: React.FC = props => (
  <div className={style.sidebarSection}>
    {props.children}
  </div>
)

export default SidebarSection
