import * as React from "react"
import UI from "../src/components/ui"

import * as style from "../src/style/single.scss"
import SchemaEditor from "../src/components/schema/SchemaEditor"
import { withRouter } from "next/router"
import { DataLoader } from "../src/components/utils"
import { DynamicAuth } from "../src/components/auth/DynamicAuth"
import SchemaSidebar from "../src/components/schema/SchemaSidebar"
import { Notification } from "polyvolve-ui/lib"
import { PRE_ALPHA_NOTIFICATION_TEXT } from "../src/constants/env"

const Schema = () => {
  return (
    <DynamicAuth>
      <DataLoader>
        <UI
          showSidebarLeft={false}
          sidebarLeftComponent={null}
          showSidebarRight={true}
          sidebarRightComponent={<SchemaSidebar />}>
          <div className={style.pageContent}>
            <Notification type="warning">
              {PRE_ALPHA_NOTIFICATION_TEXT}
            </Notification>
            <SchemaEditor />
          </div>
        </UI>
      </DataLoader>
    </DynamicAuth>
  )
}

export default withRouter(Schema)
