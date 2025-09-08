export interface ServiceRoot<Request, Response> {
  execute(request: Request): Promise<Response | null>
}
