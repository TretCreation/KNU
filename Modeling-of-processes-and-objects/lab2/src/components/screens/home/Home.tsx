import React, { FC } from 'react'

import Form from '../form/Form'
import styles from './Home.module.scss'

const Home: FC = () => (
  <div className={styles.wrapper}>
    <Form />
  </div>
)

export default Home
