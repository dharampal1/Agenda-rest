import Agenda from 'agenda'
import agendaJob from './model'
import nrc from 'node-run-cmd'

const mongoConnectionString = 'mongodb://localhost:27017/agenda-rest-dev'

export const createTask = async function (req, res, next) {
  const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobs'}})
  let taskName = req.body.taskName
  let frequency = req.body.frequency
  if (taskName && frequency) {
    try {
      await new Promise(resolve => agenda.once('ready', resolve))
      var task = await agenda.every(frequency, taskName,null,{insertOnly:true})
      if (task) {
        if(task.attrs.failCount){
          res.status(422).json({
            message: task.attrs.failReason
          })
        } else {
           agenda.define(taskName, {lockLifetime: 10000}, (job, done) => {
            console.log(taskName + ' ' + 'Job started')
            done()
          })
          await agenda.start()
          res.status(200).json({
            message: 'task scheduled and Started',
            task
          })
        }
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.status(422).json({
      message: 'taskName and frequency are required'
    })
  }
}

export const startTask = async function (req, res, next) {
  const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobs'}})
  let taskName = req.body.taskName
  try {
    await new Promise(resolve => agenda.once('ready', resolve))
    const data = await agendaJob.findOne({name: taskName})
    if (data) {
      agenda.define(taskName, {lockLifetime: 10000}, (job, done) => {
        console.log(taskName + ' ' + 'Job started')
        done()
      })
      await agenda.start()
      res.status(200).json({message: 'Started', task: data})
    } else {
      res.status(404).json({message: 'No Task Found Named : ' + ' ' + taskName})
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const stopTask = async function (req, res, next) {
  const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'jobs' } })
  let taskName = req.body.taskName
  try {
    await new Promise(resolve => agenda.once('ready', resolve))
    const data = await agendaJob.findOne({name: taskName});
    if (data) {
      // let frequency = data.repeatInterval;
      // await agenda.cancel({ name: taskName })

      //let task = await agenda.every(frequency, taskName)
      await agenda.stop(function () {
        console.log('Exiting Agenda')
       res.status(200).json({message: 'Stoped', task: task})
      process.exit(0)
      })
    } else {
      res.status(404).json({message: 'No Task Found Named : ' + ' ' + taskName})
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateTask = async function (req, res, next) {
  const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'jobs' } })
  let taskName = req.body.taskName
  let frequency = req.body.frequency
  try {
    await new Promise(resolve => agenda.once('ready', resolve))
    const data = await agendaJob.findOne({name: taskName})
    if (data) {
      await agenda.cancel({ name: taskName })
      let task = await agenda.every(frequency, taskName)
      if (task) {
        if(task.attrs.failCount){
          res.status(422).json({
            message: task.attrs.failReason
          })
        } else {
           agenda.define(taskName, {lockLifetime: 10000}, (job, done) => {
            console.log(taskName + ' ' + 'Job Restarted')
            done()
          })
          await agenda.start()
          res.status(200).json({
            message: 'task updated and restarted',
            task
          })
        } 
      }
    } else {
      res.status(404).json({ message: 'No Task Found Named : ' + ' ' + taskName })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const startAlltasks = async function (req, res, next) {
  const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'jobs' } })
  try {
    await new Promise(resolve => agenda.once('ready', resolve))
    const data = await agendaJob.find({})
    if (data.length) {
      data.map((task, i) => {
        agenda.define(task.name, {lockLifetime: 10000}, (job, done) => {
          console.log(task.name + ' ' + 'job started')
          done()
        })
        agenda.start()
        if (i + 1 === data.length) {
          res.status(200).json({ message: 'Starting All jobs' })
        }
      })
    } else {
      res.status(404).json({ message: 'No Task Found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const stopAlltasks = async function (req, res, next) {
   const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'jobs' } })
  try {
     await new Promise(resolve => agenda.once('ready', resolve))
  //   console.log(process.pid,"sd");
  //    // nrc.run(`kill -9 ${process.pid}`)  
  //     console.log(process.pid,"sjfuy");
  //     console.log("kgj");
      agenda.stop(function () {
      res.status(200).json({ message: 'Stoping All jobs' })
      process.exit(0)
      process.on('exit', (code) => {
        console.log(`About to exit with code: ${code}`)
       // nrc.run(`kill -9 ${process.pid}`)
      });
    })
     // process.on('SIGTERM', graceful);
     // process.on('SIGINT' , graceful);
   } catch (err) {
     res.status(500).json({ error: err.message })
   }
}
