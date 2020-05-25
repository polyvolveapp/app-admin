import * as React from "react"

import * as style from "../../../style/single.scss"
import { SectionSize } from "./Section";
import { cx } from "../../../lib/reexports";

interface Props {
  title: string
}

const SubsectionTitle: React.FC<Props> = props => {
  const classes = cx(style.subsectionTitle)

  return (
    <h3 className={classes}>{props.title}</h3>
  )
}

export default SubsectionTitle
