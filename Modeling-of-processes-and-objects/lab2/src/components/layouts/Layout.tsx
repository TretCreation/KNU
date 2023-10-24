import React, { FC, PropsWithChildren } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex h-screen flex-col'>{children}</div>
)
