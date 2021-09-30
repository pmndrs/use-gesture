import type { ImageInput } from '../../types'

export const sanitize = (v: any): string | undefined => {
  if (v === undefined) return undefined
  if (v instanceof File) {
    try {
      return URL.createObjectURL(v)
    } catch (e) {
      return undefined
    }
  }
  if (typeof v === 'string' && v.indexOf('blob:') === 0) return v
  throw Error(`Invalid image format [undefined | blob | File].`)
}

export const schema = (_o: any, s: any) => typeof s === 'object' && 'image' in s

export const normalize = ({ image }: ImageInput) => {
  return { value: image }
}
