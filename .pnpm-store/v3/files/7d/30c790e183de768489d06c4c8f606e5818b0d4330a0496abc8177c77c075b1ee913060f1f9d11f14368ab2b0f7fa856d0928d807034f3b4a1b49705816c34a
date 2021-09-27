import v8n from 'v8n'

export const schema = (o: any) => v8n().string().test(o)

export const sanitize = (v: any) => {
  if (typeof v !== 'string') throw Error(`Invalid string`)
  return v
}
