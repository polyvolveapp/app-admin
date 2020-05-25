import { NavigationItem as DefaultNavigationItem } from "polyvolve-ui/lib"

interface Props {
  name?: string
  url?: string
  icon?: any
  index?: boolean
  className?: string
  link?: any
  onClick?: () => void
}

const NavigationItem: React.FunctionComponent<Props> = props => (
  <DefaultNavigationItem {...props} url={props.link} />
)

export default NavigationItem
