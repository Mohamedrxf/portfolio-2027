import { useState } from 'react'
import { HamburgerButton } from './HamburgerButton'
import { Backdrop } from './Backdrop'
import { MobileDrawer } from './MobileDrawer'
import { navigationConfig } from '@/router'

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const drawerId = 'mobile-drawer'

  const toggleDrawer = () => setIsOpen(prev => !prev)
  const closeDrawer = () => setIsOpen(false)

  return (
    <>
      <HamburgerButton
        isOpen={isOpen}
        controls={drawerId}
        onClick={toggleDrawer}
        className="md:hidden"
      />
      <Backdrop isOpen={isOpen} onClick={closeDrawer} />
      <MobileDrawer
        isOpen={isOpen}
        onClose={closeDrawer}
        items={navigationConfig}
        id={drawerId}
        className="md:hidden"
      />
    </>
  )
}