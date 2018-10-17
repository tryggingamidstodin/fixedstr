function parseText(str: string) {
  return str.trim()
}

function textToString(field: IObjectDefinition, value: string) {
  value = value || ''
  const endLength = Math.max(0, field.size + 1 - value.length)
  const end = new Array(endLength).join(' ')
  return value + end
}

export interface IObjectDefinition {
  name: string
  size: number
  parse?: (item: any) => any
  toFixedString?: (field: IObjectDefinition, value: string) => string
}

export interface IFixedStr {
  objectify: (str?: string) => object
  stringify: (obj: object) => string
  str: (name: string, size: number) => IObjectDefinition
  strTrunc: (name: string, size: number) => IObjectDefinition
  number: (name: string, size: number) => IObjectDefinition
}

export default class FixedStr {
  public static str(name: string, size: number): IObjectDefinition {
    return {
      name: name,
      size: size
    }
  }

  public static strTrunc(name: string, size: number): IObjectDefinition {
    return {
      name: name,
      size: size,
      toFixedString: (field, value) => {
        const str = (value || '').substring(0, size)
        return textToString(field, str)
      }
    }
  }

  public static number(name: string, size: number): IObjectDefinition {
    return {
      name: name,
      size: size,
      parse: Number,
      toFixedString: (field, value) => {
        const strVal = value && value.toString ? value.toString() : '0'
        const pad = new Array(Math.max(0, field.size + 1 - strVal.length)).join(
          '0'
        )
        return pad + strVal
      }
    }
  }

  private objDef: IObjectDefinition[]

  constructor(ObjectDefinitions: IObjectDefinition[]) {
    this.objDef = ObjectDefinitions
  }

  public objectify(str?): object {
    let from = 0
    str = str || ''
    return this.objDef.reduce((obj, field) => {
      const parse = field.parse || parseText
      obj[field.name] = parse(str.substring(from, from + field.size))
      from += field.size
      return obj
    }, {})
  }

  public stringify(obj): string {
    return this.objDef.reduce((str, field) => {
      const toStr = field.toFixedString || textToString
      const strValue = toStr(field, obj[field.name])
      if (strValue && strValue.length > field.size) {
        throw new Error(
          'truncation error on field: ' +
            field.name +
            ', size: ' +
            field.size +
            ', value: ' +
            obj[field.name]
        )
      }
      return str + strValue
    }, '')
  }
}
