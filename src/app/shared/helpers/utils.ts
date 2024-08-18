import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator'

export function EqualsProperty(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'equalsProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value === relatedValue
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          return `${propertyName} must be equal to ${relatedPropertyName}`
        },
      },
    })
  }
}

export function timeToSeconds(timeStr: string): number {
  const timeUnits: { [key: string]: number } = {
    s: 1, // seconds
    m: 60, // minutes
    h: 3600, // hours
    d: 86400, // days
    w: 604800, // weeks
    mo: 2592000, // months (assuming 30 days per month)
    y: 31536000, // years (assuming 365 days per year)
  }

  const match = timeStr.match(/(\d+)(\D+)/)

  if (!match) {
    throw new Error('Invalid time format')
  }

  const quantity = parseInt(match[1], 10)
  const unit = match[2]

  if (timeUnits.hasOwnProperty(unit)) {
    return quantity * timeUnits[unit]
  } else {
    throw new Error(`Unknown time unit: ${unit}`)
  }
}
