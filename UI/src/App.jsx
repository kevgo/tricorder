import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import ScanSection     from './components/ScanSection'
import TransformSection from './components/TransformSection'
import LanguageSection from './components/LanguageSection'
import PipelineSection from './components/PipelineSection'
import ImpactSection   from './components/ImpactSection'
import PlaygroundSection from './components/PlaygroundSection'
import CTASection      from './components/CTASection'

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <Hero />
      <ScanSection />
      <TransformSection />
      <LanguageSection />
      <PipelineSection />
      <ImpactSection />
      <PlaygroundSection />
      <CTASection />
    </div>
  )
}
