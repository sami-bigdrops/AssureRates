'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

type TabType = 'AUTO_INSURANCE' | 'HOME_INSURANCE' | 'MORTGAGE' | 'LIFE_INSURANCE'

interface TabContextType {
  activeTab: TabType
  setActiveTab: Dispatch<SetStateAction<TabType>>
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('AUTO_INSURANCE')

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab() {
  const context = useContext(TabContext)
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider')
  }
  return context
}

