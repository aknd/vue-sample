import _ from 'lodash'
import { Vue } from 'vue-property-decorator'
import { createDecorator, VueDecorator } from 'vue-class-component'
import { buildDayjs } from './datetime-util'

const getComponentName = (vm: Vue): string =>
  (vm.$vnode.tag || '').replace(/vue-component-\d+-/i, '')

export const Log = (): VueDecorator =>
  createDecorator((options, key) => {
    if (_.isUndefined(options.methods) || !_.isFunction(options.methods[key])) {
      return
    }
    const originalMethod = options.methods[key]
    options.methods[key] = async function (...args: any[]): Promise<any> {
      if (!(this instanceof Vue)) {
        console.error(
          "Return value of 'Log' must be used as a vue custom decorator."
        )
        return await originalMethod.apply(this, args)
      }
      const componentName = getComponentName(this)
      const header = `method ${
        originalMethod.name
      } @ ${componentName} ${buildDayjs().format('HH:mm:ss')}`
      const prevData = _.cloneDeep(this.$data)

      try {
        const result = await originalMethod.apply(this, args)
        const nextData = _.cloneDeep(this.$data)
        console.group(header)
        console.log('args %o', args)
        console.log('result %o', result)
        console.log('prevData %o', prevData)
        console.log('nextData %o', nextData)
        console.groupEnd()
        return result
      } catch (error) {
        const nextData = _.cloneDeep(this.$data)
        console.group(header)
        console.log('args %o', args)
        console.error(error)
        console.log('prevData %o', prevData)
        console.log('nextData %o', nextData)
        console.groupEnd()
        throw error
      }
    }
  })

export const Catch = (handler: any = alert): VueDecorator =>
  createDecorator((options, key) => {
    if (_.isUndefined(options.methods) || !_.isFunction(options.methods[key])) {
      return
    }
    const originalMethod = options.methods[key]
    options.methods[key] = async function (...args: any[]): Promise<any> {
      if (!(this instanceof Vue)) {
        console.error(
          "Return value of 'Catch' must be used as a vue custom decorator."
        )
        return await originalMethod.apply(this, args)
      }

      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        if (_.isString(handler)) {
          const handleError = _.get(this, handler)
          if (_.isFunction(handleError)) {
            handleError(error)
          } else {
            const componentName = getComponentName(this)
            console.error(
              `Method '${handler}' does not exist on '${componentName}'.`
            )
          }
        } else if (_.isFunction(handler)) {
          handler.call(null, error, this)
        } else {
          console.error(
            "First argument of 'Catch' must be of type string, function or undefined."
          )
        }
      }
    }
  })
