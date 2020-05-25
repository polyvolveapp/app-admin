import * as React from "react"
import { componentStyle } from "../../lib/reexports";
import { Line } from "polyvolve-ui/lib";

interface SortableOverviewItem {
  id: string
}

interface SortableOverviewFilter<Item extends SortableOverviewItem> {
  name: string
  filterItem: (filterInput: string) => Item[]
}

interface Props<Item extends SortableOverviewItem> {
  items: Item[]
  renderItem: (item: Item) => JSX.Element
  filters: SortableOverviewFilter<Item>[]
}

interface State {
  filterValues: { [filterName: string]: string }
}

export default class SortableOverview<Item extends SortableOverviewItem> extends React.Component<Props<Item>, State> {
  constructor(props: Props<Item>) {
    super(props)

    this.state = {
      filterValues: {}
    }
  }

  handleFilterChange = (filter: SortableOverviewFilter<Item>): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
    return event => {
      const newFilterValues = { ...this.state.filterValues }

      newFilterValues[filter.name] = event.target.value

      this.setState({ filterValues: newFilterValues })
    }
  }

  render(): JSX.Element {
    const { items, renderItem, filters } = this.props

    return (
      <div className={componentStyle.sortableOverviewContainer}>
        <div className={componentStyle.sortableOverviewFilterContainerWrapper}>
        <h4>Filters</h4>
        <div className={componentStyle.sortableOverviewFilterContainer}>
          {filters.map(filter => (
            <div key={`sortableOverviewFilter-${filter.name}`} className={componentStyle.sortableOverviewFilter}>
              <label>{filter.name}</label>
              <input
                name="mail"
                type="email"
                onChange={this.handleFilterChange(filter)}
                value={this.state.filterValues[filter.name] || ""} />
            </div>
          ))}
        </div>
        </div>
        <Line className={componentStyle.sortableOverviewLine} />
        <div className={componentStyle.sortableOverviewItemContainer}>
          {items.map(item => (
            <div key={`sortableOverviewItem-${item.id}`} className={componentStyle.sortableOverviewItem}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
