import { createRequire } from 'node:module'
import { createSyncFn } from 'synckit'

const require = createRequire(import.meta.url)
const syncFn = createSyncFn(require.resolve('./fetch-worker.js'))

const token = process.env.LICHESS_TOKEN

export default function (options = {}) {
	return {
		name: 'penrose',
		level: 'block',
		renderer: {
			code(code, infostring, escaped) {
				if (infostring !== 'lichess') {
					return false
				}

				const username = code || 'hyperupcall'
				const { id, json } = syncFn(token, username)

				return `<p>${id}'s rapid rating: ${json?.perfs?.rapid?.rating || -1}</p>\n`
			},
		},
	}
}
