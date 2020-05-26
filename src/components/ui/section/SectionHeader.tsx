import * as React from "react"

import * as style from "../../../style/single.module.scss"
import { SectionSize } from "./Section";
import { cx } from "../../../lib/reexports";

interface Props {
}

const SectionHeader: React.FC<Props> = props => {
  const classes = cx(style.sectionHeader)

  return (
    <div className={classes}>{props.children}</div>
  )
}

export default SectionHeader
