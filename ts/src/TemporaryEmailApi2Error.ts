
import { Context } from './Context'


class TemporaryEmailApi2Error extends Error {

  isTemporaryEmailApi2Error = true

  sdk = 'TemporaryEmailApi2'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TemporaryEmailApi2Error
}

