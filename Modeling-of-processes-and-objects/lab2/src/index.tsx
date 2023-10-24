import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Layout } from './components/layouts/Layout'
import Home from './components/screens/home/Home'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <Layout>
    <Home />
  </Layout>
)
