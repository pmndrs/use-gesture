import v8n from 'v8n'

export const schema = (o: any) => v8n().boolean().test(o)

export const sanitize = (v: any): boolean => {
  if (typeof v !== 'boolean') throw Error('Invalid boolean')
  return v
}
