import HomeSearch from '../components/HomeSearch'
import JoinAsPro from '../components/JoinasPro'
import ServiceList from '../components/ServiceList'
import Steps from '../components/Steps'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className='flex flex-col gap-10 bg-slate-50'>
     <HomeSearch />
     <Features />
     <ServiceList />
     <Steps />
     <JoinAsPro />
    </div>
  )
}

export default Home