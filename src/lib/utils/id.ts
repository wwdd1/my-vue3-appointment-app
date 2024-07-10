import { v4 } from 'uuid'

export const createUUID = (): string => {
  return v4()
}
