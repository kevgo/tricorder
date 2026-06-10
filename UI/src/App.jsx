import Navbar            from './components/Navbar'
import Hero              from './components/Hero'
import TricorderSection  from './components/TricorderSection'
import TransformSection  from './components/TransformSection'
import LanguageSection   from './components/LanguageSection'
import PipelineSection   from './components/PipelineSection'
import PlaygroundSection from './components/PlaygroundSection'
import CTASection        from './components/CTASection'

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <Hero />
      <TricorderSection />
      <TransformSection />
      <LanguageSection />
      <PipelineSection />

      {/* <ImpactSection /> */}

      <PlaygroundSection />
      <CTASection />
    </div>
  )
}
