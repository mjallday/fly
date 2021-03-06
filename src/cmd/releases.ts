import { root, getAppName } from './root'
import { API } from './api'
import { processResponse } from '../utils/cli'

export interface ReleasesOptions { }
export interface ReleasesArgs { }

root
  .subCommand<ReleasesOptions, ReleasesArgs>("releases")
  .description("Manage Fly apps.")
  .action(async (opts, args, rest) => {
    try {
      const appName = getAppName()
      const res = await API.get(`/api/v1/apps/${appName}/releases`)
      processResponse(res, (res: any) => {
        if (res.data.data.length == 0)
          return console.log(`No releases for ${appName} yet.`)
        for (let r of res.data.data) {
          console.log(`v${r.attributes.version} ${r.attributes.reason} by ${r.attributes.author} on ${r.attributes.created_at}`)
        }
      })
    } catch (e) {
      if (e.response)
        console.log(e.response.data)
      else
        throw e
    }
  })