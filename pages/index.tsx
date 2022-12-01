import Blank from '../components/layouts/blank'
import MainLayout from '../components/layouts/mainLayout'
import type { NextPageWithLayout } from './_app'

import type { ReactElement } from 'react'

const Index: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Blank>
      <MainLayout>{page}</MainLayout>
    </Blank>
  )
}

export default Index
