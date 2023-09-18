import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => {
  return (
    <ContentLoader viewBox="0 0 778 116" backgroundColor='#454545' style={{ opacity: '0.4'}} width={778} height={116} >
      <rect x="0" y="34" rx="0" ry="0" width="0" height="0" />
      <rect x="0" y="29" rx="0" ry="0" width="258" height="32" />
      <rect x="0" y="71" rx="0" ry="0" width="465" height="32" />
      <rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
      <rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
    </ContentLoader>
  )
}

export default Skeleton