import * as React from "react"
import { SidebarSection } from ".";
import SidebarSectionTitle from "./SidebarSectionTitle";
import * as style from "../../../style/sidebar.scss"

const Actions: React.FC = props => (
  <React.Fragment>
    <SidebarSectionTitle title="Actions" />
    <SidebarSection>
      {props.children}
    </SidebarSection>
  </React.Fragment>
)

export default Actions
