import cx from "classnames"
import Select from "react-select"
import * as modalStyle from "../style/modal.scss"
import * as singleStyle from "../style/single.scss"
import * as componentStyle from "../style/component.scss"
import * as formStyle from "../style/form.scss"
import * as schemaStyle from "../style/schema.scss"
import * as style from "../style/style.scss"
import * as overviewStyle from "../style/overview/overview.scss"
import * as reviewMasterOverviewStyle from "../style/overview/reviewmaster.scss"
import * as dashboardStyle from "../style/dashboard.scss"

/**
 * The purpose is to provide auto import for often used objects which can
 * otherwise not be auto imported.
 */

export {
  cx,
  modalStyle,
  style,
  formStyle,
  schemaStyle,
  singleStyle,
  componentStyle,
  Select,
  overviewStyle,
  dashboardStyle,
  reviewMasterOverviewStyle
}
