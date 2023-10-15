import { runAsWorker } from 'synckit'
import { fetchLichessData } from "./fetch.js";

runAsWorker(async (...args) => {
	return await fetchLichessData(...args)
})
