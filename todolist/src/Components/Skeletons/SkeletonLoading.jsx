import React from 'react'
import ContentLoader from 'react-content-loader'

const ThreeDots = props => (
  <ContentLoader
    style={{ margin: '0 auto', width: '100%', height: '100vh'}}
    viewBox="0 0 400 160"
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="150" cy="70" r="5" />
    <circle cx="194" cy="70" r="5" />
    <circle cx="238" cy="70" r="5" />
  </ContentLoader>
)

export default ThreeDots