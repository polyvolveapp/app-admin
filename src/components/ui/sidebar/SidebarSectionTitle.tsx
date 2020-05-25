import * as React from "react"

import * as style from "../../../style/sidebar.scss"

interface Props {
  title: string
}

const SidebarSectionTitle: React.FC<Props> = props => (
  <div>
    <h2 className={style.sidebarSectionTitle}>{props.title}</h2>
  </div>
)

export default SidebarSectionTitle
