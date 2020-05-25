import * as React from "react"
import { componentStyle } from "../../lib/reexports";

interface Props {

}

interface State {

}

export default class Search extends React.Component<Props, State> {
  render(): JSX.Element {
    return (
      <div>
        <input className={componentStyle.searchInput}
          name="searchInput"
          type="text"
          placeholder="Search..." />
      </div>
    )
  }
}
