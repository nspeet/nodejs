import { ExtensionUpdate } from '../../models/Extension'
import { Extension } from '../../models/Extension'
import { Middleware } from '../../base/common-types'
import { ApiRequest } from '../../base/requests-utils'

export class ByProjectKeyExtensionsByIDRequestBuilder {
  constructor(
    protected readonly args: {
      pathArgs: {
        projectKey: string
        ID: string
      }
      middlewares: Middleware[]
    }
  ) {}

  get(methodArgs?: {
    queryArgs?: {
      expand?: string
    }
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<Extension> {
    return new ApiRequest<Extension>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'GET',
        uriTemplate: '/{projectKey}/extensions/{ID}',
        pathVariables: this.args.pathArgs,
        headers: {
          ...(methodArgs || ({} as any)).headers,
        },
        queryParams: (methodArgs || ({} as any)).queryArgs,
      },
      this.args.middlewares
    )
  }

  post(methodArgs: {
    queryArgs?: {
      expand?: string
    }
    body: ExtensionUpdate
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<Extension> {
    return new ApiRequest<Extension>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'POST',
        uriTemplate: '/{projectKey}/extensions/{ID}',
        pathVariables: this.args.pathArgs,
        headers: {
          'Content-Type': 'application/json',
          ...(methodArgs || ({} as any)).headers,
        },
        queryParams: (methodArgs || ({} as any)).queryArgs,
        body: (methodArgs || ({} as any)).body,
      },
      this.args.middlewares
    )
  }

  delete(methodArgs: {
    queryArgs: {
      version: number
      expand?: string
    }
    headers?: {
      [key: string]: string
    }
  }): ApiRequest<Extension> {
    return new ApiRequest<Extension>(
      {
        baseURL: 'https://api.sphere.io',
        method: 'DELETE',
        uriTemplate: '/{projectKey}/extensions/{ID}',
        pathVariables: this.args.pathArgs,
        headers: {
          ...(methodArgs || ({} as any)).headers,
        },
        queryParams: (methodArgs || ({} as any)).queryArgs,
      },
      this.args.middlewares
    )
  }
}
