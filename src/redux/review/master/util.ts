import * as moment from "moment"
import { ReviewMaster } from "..";

export function transformReviewMaster(data: any): ReviewMaster {
  const newData: ReviewMaster = {
    ...data,
    periodStart: moment(data.periodStart, "YYYY-MM-DD"),
    periodEnd: moment(data.periodEnd, "YYYY-MM-DD"),
    dueAt: moment(data.dueAt, "YYYY-MM-DD"),
  }

  return newData
}
