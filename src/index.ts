import concat from 'concat-stream'
import { ClientRequest, ClientResponse } from 'http'
const hyperquest = require('hyperquest')
import { Readable } from 'stream'

// Wait for the request to finish or fail

function promisify(req: any) {
  return new Promise(function (resolve, reject) {
    req.on('error', reject).pipe(concat({ encoding: 'string' }, resolve))
  })
}

// Prepare the request object

function send(method: any, url?: any, options?: Options, payload?: any): Promise<PromiseResolveType> {
  options = options || {}
  options.method = method
  options.headers = options.headers || {}

  return new Promise(function (resolve, reject) {
    var req = hyperquest(url, options)

    // Send the payload down the wire, if present and applicable

    if (payload && req.writable && (payload instanceof Readable || payload.on)) {
      payload.pipe(req)
    } else if (payload && req.writable) {
      if (typeof payload != 'string') {
        req.end()
        return reject(new Error('Payload must be a stream or a string'))
      }
      ((options as Options).headers as Headers)['content-length'] = Buffer.byteLength(payload, 'utf-8') || 0
      req.write(payload)
    } else if (req.writable) {
      req.write(null)
    }

    // Wrap the response and error in a blanket of information

    promisify(req).
      then(function (data) {
        resolve({
          data: data,
          error: null,
          options: options,
          request: req.request,
          response: req.response
        } as any)
      }, function (err) {
        reject({
          data: null,
          error: err,
          options: options,
          request: req.request,
          response: req.response
        })
      }) as any
  })
}

export interface PromiseResolveType {
  data: string,
  error: any,
  options: Options,
  request: ClientRequest,
  response: ClientResponse
}
export interface Headers {
  [key: string]: any
}
export interface Options {
  url?: string
  scheme?: string
  method?: string
  host?: string
  port?: string
  path?: string
  agent?: string | false
  headers?: Headers
  withCredentials?: any
  localAddress?: any
  pfx?: any
  key?: any
  cert?: any
  ca?: any
  ciphers?: any
  rejectUnauthorized?: any
  secureProtocol?: any
}
export const get = function (url?: string, options?: Options, payload?: any): Promise<PromiseResolveType> {
  return send('get', url, options, payload)
}
export const put = function (url?: string, options?: Options, payload?: any): Promise<PromiseResolveType> {
  return send('put', url, options, payload)
}
export const post = function (url?: string, options?: Options, payload?: any): Promise<PromiseResolveType> {
  return send('post', url, options, payload)
}
export const delete_ = function (url?: string, options?: Options, payload?: any): Promise<PromiseResolveType> {
  return send('delete', url, options, payload)
}
export const patch = function (url?: string, options?: Options, payload?: any): Promise<PromiseResolveType> {
  return send('patch', url, options, payload)
}
export const head = function (url?: string, options?: Options, payload?: any): Promise<PromiseResolveType> {
  return send('head', url, options, payload)
}
