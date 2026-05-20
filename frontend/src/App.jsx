import './App.css'
import { Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import WorkerOnboarding from './components/WorkerOnBoard'
import WorkerProfile from './pages/WorkerProfile'

function App() {
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/WorkerForm" element={<WorkerOnboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workers/:id" element={<WorkerProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

