import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { ContactIndex } from './pages/ContactIndex'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Stats } from './pages/Stats'
import { TransferFund } from './cmps/TransferFund'
import { userService } from './services/userService'

function RouteGuard({ children }) {
  const isLoggedIn = userService.getLoggedinUser()

  if (!isLoggedIn) return <Navigate to='/signup' />
  return <>{children}</>
}
function App() {
  return (
    <Router>
      <section className='main-app'>
        <AppHeader />
        <Routes>
          <Route
            path='/contact/:id'
            element={
              <RouteGuard>
                <ContactDetails />
              </RouteGuard>
            }
          />
          <Route
            path='/'
            element={
              <RouteGuard>
                <HomePage />
              </RouteGuard>
            }
          />
          <Route path='/contact/:id?' element={<ContactIndex />} />
          <Route path='/about' element={<Stats />}></Route>
          <Route path='contact/edit/:id?' element={<ContactEdit />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='TransferFund/:id?' element={<TransferFund />} />
        </Routes>

        <AppFooter />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
          integrity='sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </section>
    </Router>
  )
}

export default App
