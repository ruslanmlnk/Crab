import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
const home = await payload.findGlobal({ slug: 'home', locale: 'en', fallbackLocale: false, depth: 1 })

console.log(JSON.stringify({
  realExperience: home.realExperience,
  pricing: home.pricing,
  hero: home.hero,
  whatYouFind: home.whatYouFind,
  whoWeAre: home.whoWeAre,
}, null, 2))
