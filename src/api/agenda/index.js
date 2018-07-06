import { Router } from 'express'
import { createTask, startTask, stopTask, updateTask, startAlltasks, stopAlltasks } from './controller'

const router = new Router()

/**
 * @api {post} /agenda/task Create task
 * @apiName Create Task
 * @apiGroup Agenda
 * @apiSuccess {Object} agenda Agenda's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Agenda not found.
 */
router.post('/task', createTask)

/**
 * @api {post} /agenda/start Start task
 * @apiName Start Task
 * @apiGroup Agenda
 * @apiSuccess {Object} agenda Agenda's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Agenda not found.
 */
router.post('/start', startTask)

/**
 * @api {put} /agenda/task Update task
 * @apiName Update Task
 * @apiGroup Agenda
 * @apiSuccess {Object} agenda Agenda's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Agenda not found.
 */

router.put('/task', updateTask)

/**
 * @api {post} /agenda/stop Stop task
 * @apiName Stop Task
 * @apiGroup Agenda
 * @apiSuccess {Object} agenda Agenda's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Agenda not found.
 */

router.post('/stop', stopTask)

/**
 * @api {post} /agenda/startAll start all tasks
 * @apiName start All Tasks
 * @apiGroup Agenda
 * @apiSuccess {Object} agenda Agenda's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Agenda not found.
 */

router.post('/startAll', startAlltasks)

/**
 * @api {post} /agenda/stopAll Stop All tasks
 * @apiName atop All Tasks
 * @apiGroup Agenda
 * @apiSuccess {Object} agenda Agenda's data.
 * @apiError {Object} 422 Some parameters may contain invalid values.
 * @apiError 404 Agenda not found.
 */

router.post('/stopAll', stopAlltasks)

export default router
