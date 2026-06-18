import { Hero } from '../sections/Hero'
import { Media } from '../sections/Media'
import { Listings } from '../sections/Listings'
import { Services } from '../sections/Services'
import { CtaBand } from '../components/sections/CtaBand'

export function Home() {
  return (
    <>
      <Hero />
      <Media />
      <Services />
      <Listings />
      <CtaBand />
    </>
  )
}
