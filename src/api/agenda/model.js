import mongoose, { Schema } from 'mongoose'

const agendaSchema = new Schema({
  name: String,
  type: String,
  data: Object,
  lastModifiedBy: String,
  nextRunAt: String,
  priority: String,
  repeatInterval: String,
  repeatTimezone: String,
  lockedAt: String,
  lastRunAt: String,
  lastFinishedAt: String
})

const Job = mongoose.model('job', agendaSchema)

export default Job
