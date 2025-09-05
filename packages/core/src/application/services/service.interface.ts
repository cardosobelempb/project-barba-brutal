export interface IService<Request, Response> {
  execute(request: Request): Promise<Response | null>
}
