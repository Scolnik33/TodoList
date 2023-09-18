import React from 'react'
import ContentLoader from 'react-content-loader'

const NestedList = props => (
  <ContentLoader style={{ marginLeft: "-20px", opacity: "0.4"}} backgroundColor='#454545' viewBox="0 0 1450 130" height={25} width={400} {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="400" height="30" />
  </ContentLoader>
)

export default NestedList