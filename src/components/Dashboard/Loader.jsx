
import { useState } from 'react'
import GridLoader from 'react-spinners/GridLoader'
import Layout from '@components/Layout'

const Loader = () => {
  const [color, setColor] = useState('#3e8cee')
  return (
    <Layout title='Smart Meter App | Dashboard' content='Loader page'>
      <GridLoader
        color={color}
        size={40}
        aria-label='Loading Spinner'
        data-testid='loader'
        style={{ display: 'block', margin: '30vh auto' }}
      />
    </Layout>
  )
}

export default Loader
