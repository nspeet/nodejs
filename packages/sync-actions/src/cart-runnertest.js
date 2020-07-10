import { createSyncCategories } from './sync-actions'
import clientCreate from '@commercetools/sdk-client'
import middlewareAuth from '@commercetools/sdk-middleware-auth'
import requestBuilder from '@commercetools/api-request-builder'
import createMiddleware from '@commercetools/sdk-middleware-http'
import clientQueue from '@commercetools/sdk-middleware-queue'
const syncCategories = createSyncCategories()
const projectKey = process.env.PROJECT_KEY
const scopeStr = `manage_project:${projectKey} view_api_clients:${projectKey} manage_api_clients:${projectKey}`
const authMiddleware = middlewareAuth.createAuthMiddlewareForClientCredentialsFlow(
  {
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    scopes: [scopeStr],
    fetch
  }
)

const httpMiddleware = createMiddleware.createHttpMiddleware({
  host:
    process.env.CT_API_URL || 'https://api.us-central1.gcp.commercetools.com',
  fetch
})
const queueMiddleware = clientQueue.createQueueMiddleware({
  concurrency: 5
})
const client = clientCreate.createClient({
  middlewares: [authMiddleware, httpMiddleware, queueMiddleware]
})

//Category test
const before = {
  name: { en: 'My Category' }
}
const now = {
  name: { en: 'My Category', de: 'Meine Kategorie' }
}
const actions = syncCategories.buildActions(now, before)
const categoriesRequest = {
  uri: `/categories/${before.id}`,
  method: 'POST',
  body: JSON.stringify({ version: before.version, actions })
}

client
  .execute(categoriesRequest)
  .then(result => console.log(result))
  .catch(error => console.log(error))

//cart sync tests
const beforeCart = {
  name: { en: 'My Category' }
}
const nowCart = {
  name: { en: 'My Category', de: 'Meine Kategorie' }
}
const actionsCart = syncCategories.buildActions(nowCart, beforeCart)
const cartRequest = {
  uri: `/cart/${beforeCart.id}`,
  method: 'POST',
  body: JSON.stringify({ version: beforeCart.version, actionsCart })
}

client
  .execute(cartRequest)
  .then(result => console.log(result))
  .catch(error => console.log(error))
