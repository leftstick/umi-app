import React from 'react'

function Analysis() {
  return <>analysis</>
}

Analysis.requireSignin = true
Analysis.layout = 'PRO_LAYOUT'
Analysis.wrappers = ['@/wrappers/auth']

export default Analysis
