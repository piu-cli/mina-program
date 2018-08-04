export const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

const config = require(`./${env}.js`)

export default { ...config }
