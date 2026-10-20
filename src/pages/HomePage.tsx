import { Hero } from '../components/home/Hero'
import { WhyEngineering } from '../components/home/WhyEngineering'
import { Fundamentals } from '../components/home/Fundamentals'
import { InteractiveLab } from '../components/home/InteractiveLab'
import { RealLife } from '../components/home/RealLife'
import { DesignExploration } from '../components/home/DesignExploration'
import { Journey } from '../components/home/Journey'
import { Closing } from '../components/home/Closing'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WhyEngineering />
      <Fundamentals />
      <InteractiveLab />
      <RealLife />
      <DesignExploration />
      <Journey />
      <Closing />
    </div>
  )
}