import * as React from "react"
import cx from "classnames"
import { connect } from "react-redux"
import { RootState } from "../../redux"

import * as chevronDownIcon from "../../assets/icons/chevron-down.svg"
import * as userHeaderStyle from "../../style//nav.module.scss"
import { Icon } from "polyvolve-ui/lib/icons"

interface Props {
  name?: string
  surname?: string
  id?: string
  className?: string
}

class UserHeader extends React.Component<Props> {
  render(): JSX.Element {
    const { name, surname, className, id } = this.props

    return (
      <div className={cx(className, userHeaderStyle.userHeader)}>
        {name && surname && <span>{name + " " + surname}</span>}
        <Icon src={chevronDownIcon} size={{ width: 24, height: 24 }} />
      </div>
    )
  }
}


function mapStateToProps(state: RootState): Partial<Props> {
  return {
    name: state.admin.global.name,
    surname: state.admin.global.surname,
  }
}

export default connect<{}, {}, Props>(mapStateToProps)(UserHeader)
