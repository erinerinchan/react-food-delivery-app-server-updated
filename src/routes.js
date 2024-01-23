import { Router } from 'express'

const router = Router()

// RESTAURANTS
router.get('/api/restaurants', (await import('./controllers/api/restaurants/index.js')).default)
router.get('/api/restaurants/:_id', (await import('./controllers/api/restaurants/show.js')).default)

// RESTAURANT FILTERABLE
router.get('/api/filterable', (await import('./controllers/api/filterable/index.js')).default)

// Payment Related
router.post('/api/payments', (await import('./controllers/api/payment.js')).default)

export default router
