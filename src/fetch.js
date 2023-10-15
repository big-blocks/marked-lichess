import fs from 'fs'

export async function fetchLichessData(token, username) {
	try {
		const res = await fetch(`https://lichess.org/api/user/${username}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const json = await res.json()
		await fs.promises.writeFile('token', token)
		await fs.promises.writeFile('file.json', JSON.stringify(json, null, '\t'))
		return {
			id: username,
			json,
		}
	} catch {
		return {
			id: 'unknown',
			json: {}
		}
	}
}
