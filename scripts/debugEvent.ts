import { historicalEvents } from '../packages/historical-data/src/seed/historicalEvents'

const e = historicalEvents.find((x) => x.id === 'evt_french_revolution')
if (e) {
	console.log('Keys:', Object.keys(e))
	console.log('requiredEventIds:', (e as any).requiredEventIds)
	console.log('Full event:', JSON.stringify(e, null, 2).slice(0, 1000))
}
