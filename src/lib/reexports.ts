import cx from "classnames"
import Select from "react-select"
import * as modalStyle from "../style/modal.module.scss"
import * as singleStyle from "../style/single.module.scss"
import * as formStyle from "../style/form.module.scss"
import * as schemaStyle from "../style/schema.module.scss"
import * as overviewStyle from "../style/overview/overview.module.scss"
import * as reviewMasterOverviewStyle from "../style/overview/reviewmaster.module.scss"
import * as dashboardStyle from "../style/dashboard.module.scss"
import { componentStyle, style } from "../../pages/_app"

/**
 * The purpose is to provide auto import for often used objects which can
 * otherwise not be auto imported.
 */

export {
  cx,
  modalStyle,
  formStyle,
  schemaStyle,
  singleStyle,
  Select,
  style,
  componentStyle,
  overviewStyle,
  dashboardStyle,
  reviewMasterOverviewStyle
}
