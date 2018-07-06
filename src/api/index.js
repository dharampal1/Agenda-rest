import { Router } from 'express'
import agenda from './agenda'

const router = new Router()

router.use('/agenda', agenda)

/**
 * @apiDefine listParams
 * @apiParam {String} taskname.
 * @apiParam {String} frequency.
 */

export default router
