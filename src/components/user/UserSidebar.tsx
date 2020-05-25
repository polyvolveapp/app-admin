import * as React from "react"
import Actions from "../ui/sidebar/Actions"
import RecentlyViewed from "../ui/sidebar/RecentlyViewed"
import { connect } from "react-redux"
import { RootState } from "../../redux"
import { Dispatch } from "redux"
import { User } from "polyvolve-ui/lib/@types"
import { UserGlobalActions } from "../../redux/user"
import Link from "next/link"
import { WithRouterProps } from "next/dist/client/with-router"

interface Props extends WithRouterProps {
  user?: User
  userGlobalActions?: typeof UserGlobalActions
}

class UserSidebar extends React.Component<Props> {
  // this is stupid.. normal link.
  onGoToOverview = () => this.props.router.push("/overview/user")

  onDelete = () => {
    const { userGlobalActions, user, router } = this.props

    userGlobalActions!.removeUserRequest({ id: user.id })

    router.push("/overview/user")
  }

  render(): JSX.Element {
    const { user } = this.props

    return (
      <React.Fragment>
        <Actions>
          {!user && "..."}
          {user && (
            <ul>
              <li>
                <Link href="/overview/user">
                  <a>Go to overview</a>
                </Link>
              </li>
              <li>
                <a onClick={this.onDelete}>Delete user</a>
              </li>
              <li>
                <a onClick={() => {}}>Copy direct link</a>
              </li>
            </ul>
          )}
        </Actions>
        <RecentlyViewed />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state: RootState): Partial<Props> {
  return {
    user: state.user.specified.data,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<Props> {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSidebar)
