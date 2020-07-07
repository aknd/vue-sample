/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

declare module 'lodash' {
  interface LoDashStatic {
    camelCaseObject(obj: any, omitBy?: (value: any) => boolean): any
    snakeCaseObject(obj: any, omitBy?: (value: any) => boolean): any
  }
}

const convertObject = (
  obj: any,
  keyConverter: (key: string) => string,
  omitBy?: (value: any) => boolean
): any => {
  if (!_.isArray(obj) && !_.isPlainObject(obj)) {
    return obj
  }
  if (_.isArray(obj)) {
    return obj.map(element => convertObject(element, keyConverter, omitBy))
  }
  const partialObj = _.isUndefined(omitBy) ? obj : _.omitBy(obj, omitBy)

  return _.reduce(
    partialObj,
    (result, value, key) => ({
      ...result,
      [keyConverter(key)]: convertObject(value, keyConverter, omitBy)
    }),
    {}
  )
}

const camelCaseObject = (obj: any, omitBy?: (value: any) => boolean): any =>
  convertObject(obj, _.camelCase, omitBy)

const snakeCaseObject = (obj: any, omitBy?: (value: any) => boolean): any =>
  convertObject(obj, _.snakeCase, omitBy)

_.mixin({
  camelCaseObject,
  snakeCaseObject
})

export default _
