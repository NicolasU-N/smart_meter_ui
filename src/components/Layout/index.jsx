import { Helmet } from 'react-helmet'
import Navbar from '@components/Navbar'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={content} />
    </Helmet>
    <Navbar />
    <div className='container mt-2'>{children}</div>
    {/* //TODO: Add Footer */}
  </>
)

export default Layout
