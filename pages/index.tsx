import type { NextPageWithLayout } from './_app'

import type { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Blank from '../components/layouts/blank'
import MainLayout from '../components/layouts/mainLayout'

const Index: NextPageWithLayout = () => {
  return <div><p>
    hello world
    
    </p>
    <FontAwesomeIcon icon={faEnvelope} />
 </div>
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Blank>
      <MainLayout>{page}</MainLayout>
    </Blank>
  )
}

export default Index
