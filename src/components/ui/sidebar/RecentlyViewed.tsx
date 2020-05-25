import * as React from "react"
import { connect } from "react-redux";
import { RootState } from "../../../redux";
import { RecentlyViewedItem } from "../../../redux/recentlyviewed";
import { SidebarSection } from ".";
import SidebarSectionTitle from "./SidebarSectionTitle";
import { NavigationItem } from "../../utils";
import { getRecentlyViewedItemUrl, getRecentlyViewedItemColor } from "../../../lib/recentlyviewed";

import * as style from "../../../style/sidebar.scss"
import TypeIcon from "../TypeIcon";

interface Props {
  all: RecentlyViewedItem[]
}

class RecentlyViewed extends React.Component<Props> {
  render(): JSX.Element {
    const { all } = this.props

    return (
      <React.Fragment>
        <SidebarSectionTitle title="Recently viewed" />
        <SidebarSection>
          <ul>
            {all.map(recentlyViewedItem => (
              <div key={`recently-viewed-item-${recentlyViewedItem.name}-div`} className={style.recentlyViewedItem}>
                <TypeIcon name={recentlyViewedItem.type} color={getRecentlyViewedItemColor(recentlyViewedItem)} />
                <NavigationItem key={`recently-viewed-item-${recentlyViewedItem.name}`}
                  className={style.sectionListItem}
                  name={recentlyViewedItem.name}
                  url={getRecentlyViewedItemUrl(recentlyViewedItem)} />
              </div>
            ))}
          </ul>
        </SidebarSection>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state: RootState): Props {
  return {
    all: state.recentlyViewed.all
  }
}

export default connect(mapStateToProps)(RecentlyViewed)
