// sanity.clients.ts

import { createClient } from 'next-sanity'
import { config } from './sanity.config'
// import { config } from '../sanity.config'
// console.log('Sanity Config:', config) 
export const sanityClient = createClient(config)

    