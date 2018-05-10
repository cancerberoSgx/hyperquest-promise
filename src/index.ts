import concat from 'concat-stream';
import { ClientRequest, ClientResponse } from 'http';
import * as hyperquest from 'hyperquest';
import { Readable } from 'stream';
// import { RequestAPI, Request, CoreOptions, RequiredUriUrl, Headers, ResponseRequest } from 'request';
// import { Options, Request } from 'request';


// Wait for the request to finish or fail

function promisify(req: any) {
  return new Promise(function (resolve, reject) {
    req.on('error', reject).pipe(concat({ encoding: 'string' }, resolve))
  })
}

// Prepare the request object

function send(method: any, url?: any,  options?: IOptions, payload?: any) :  Promise<PromiseResolveType>{
  options = options || {}
  options.method = method
  options.headers = options.headers || {}

  return new Promise(function (resolve, reject) {
    var req = hyperquest(url, options)

    // Send the payload down the wire, if present and applicable

    if (payload && req.writable && payload instanceof Readable) {
      payload.pipe(req)
    } else if (payload && req.writable) {
      if (typeof payload != 'string') {
        req.end()
        return reject(new Error('Payload must be a stream or a string'))
      }
      ((options as IOptions).headers as Headers)['content-length'] = Buffer.byteLength(payload, 'utf-8') || 0
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


// interface RequestAPI<TRequest extends Request, TOptions extends CoreOptions, TUriUrlOptions> {
//   // defaults(options: TOptions): RequestAPI<TRequest, TOptions, RequiredUriUrl>;
//   // defaults(options: RequiredUriUrl & TOptions): DefaultUriUrlRequestApi<TRequest, TOptions, OptionalUriUrl>;

//   (uri: string, options?: TOptions): Promise<>;
//   (options: TUriUrlOptions & TOptions): TRequest;

//   get(uri: string, options?: TOptions): TRequest;
//   get(options: TUriUrlOptions & TOptions): TRequest;

//   post(uri: string, options?: TOptions): TRequest;
//   post(options: TUriUrlOptions & TOptions): TRequest;

//   put(uri: string, options?: TOptions): TRequest;
//   put(options: TUriUrlOptions & TOptions): TRequest;

//   head(uri: string, options?: TOptions): TRequest;
//   head(options: TUriUrlOptions & TOptions): TRequest;

//   patch(uri: string, options?: TOptions): TRequest;
//   patch(options: TUriUrlOptions & TOptions): TRequest;

//   del(uri: string, options?: TOptions): TRequest;
//   del(options: TUriUrlOptions & TOptions): TRequest;

//   delete(uri: string, options?: TOptions): TRequest;
//   delete(options: TUriUrlOptions & TOptions): TRequest;

//   initParams(uri: string, options?: TOptions): RequiredUriUrl & TOptions;
//   initParams(uriOrOpts: string | RequiredUriUrl & TOptions): RequiredUriUrl & TOptions;

//   // forever(agentOptions: any, optionsArg: any): TRequest;
//   // jar(store?: any): CookieJar;
//   // cookie(str: string): Cookie | undefined;

//   // debug: boolean;
// }



// Generate shorthand methods for http verbs
// declare type SendSignature = (url: string, options: IOptions, payload: any) => Promise
// export interface IHyperquestPromise {
//   get: SendSignature
//   put: SendSignature
//   post: SendSignature
//   delete: SendSignature
//   patch: SendSignature
//   head: SendSignature
// }

export interface PromiseResolveType {
  data: string,
  error: any,
  options: IOptions,
  request: ClientRequest,
  response: ClientResponse
}
interface Headers {
  [key: string]: any;
}
export interface IOptions {
  url?: string
  scheme?: string
  method?: string
  host?: string
  port?:string
  path?:string
  agent?: string|false
  headers?: Headers
  withCredentials?: any
  localAddress?: any
  pfx?: any
  key?: any
  cert?: any
  ca ?: any
  ciphers?: any
  rejectUnauthorized?: any
  secureProtocol?: any
}
// const Send =  {
//   get(url: string, options: IOptions, payload: any): Promise<PromiseResolveType> {
//     return send('get', url, options, payload)
//   },
//   put(url: string, options: IOptions, payload: any): Promise<PromiseResolveType> {
//     return send('put', url, options, payload)
//   },
//   post(url: string, options: IOptions, payload: any): Promise<PromiseResolveType> {
//     return send('post', url, options, payload)
//   },
//   delete(url: string, options: IOptions, payload: any) : Promise<PromiseResolveType>{
//     return send('delete', url, options, payload)
//   },
//   patch(url: string, options: IOptions, payload: any): Promise<PromiseResolveType> {
//     return send('patch', url, options, payload)
//   },
//   head(url: string, options: IOptions, payload: any): Promise<PromiseResolveType> {
//     return send('head', url, options, payload)
//   }
// }

export const get = function (url?: string, options?: IOptions, payload?: any): Promise<PromiseResolveType>{
  return send('get', url, options, payload)
}
export const put = function (url?: string, options?: IOptions, payload?: any): Promise<PromiseResolveType>{
  return send('put', url, options, payload)
}
export const post = function (url?: string, options?: IOptions, payload?: any): Promise<PromiseResolveType>{
  return send('post', url, options, payload)
}
export const delete_ = function (url?: string, options?: IOptions, payload?: any): Promise<PromiseResolveType>{
  return send('delete', url, options, payload)
}
export const patch = function (url?: string, options?: IOptions, payload?: any): Promise<PromiseResolveType>{
  return send('patch', url, options, payload)
}
export const head = function (url?: string, options?: IOptions, payload?: any): Promise<PromiseResolveType>{
  return send('head', url, options, payload)
}

// ['get', 'put', 'post', 'delete', 'patch', 'head'].forEach(function (method) {
//   (send as any)[method] = function (url: string, options: CoreOptions, payload: any) {
//     return send(method, url, options, payload)
//   }
// })

// export default Send
