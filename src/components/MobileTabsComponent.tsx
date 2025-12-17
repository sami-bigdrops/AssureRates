'use client'

import React, { ReactNode, isValidElement, cloneElement, ReactElement } from 'react'

interface TabOption {
  id: string
  label: string
  icon: ReactNode
}

interface MobileTabsComponentProps {
  tabs: TabOption[]
  activeTab: string
  onTabChange: (tabId: string) => void
  autoChangeInterval?: number
}

export default function MobileTabsComponent({
  tabs,
  activeTab,
  onTabChange,
}: MobileTabsComponentProps) {
  return (
    <div className="mobile-nav-tabs rounded-full block md:hidden w-full bg-white  px-2 py-1.5">
      <div className="flex items-center justify-center gap-1.5 w-full overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          const sizedIcon = isValidElement(tab.icon)
            ? (() => {
                const existingClass =
                  (tab.icon.props as { className?: string })?.className ?? ''
                return cloneElement(tab.icon as ReactElement<{ className?: string }>, {
                  className: `${existingClass} ${isActive ? 'w-3.5 h-3.5' : 'w-5.5 h-5.5'}`.trim(),
                })
              })()
            : tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center flex-shrink-0 rounded-full focus:outline-none transition-all duration-300 ${
                isActive
                  ? 'px-2 py-2 bg-[#3476DB] gap-1'
                  : 'w-10 h-10 bg-gradient-to-br from-[#07A5EC] to-[#3476DB]'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'w-7 h-7 rounded-full bg-white'
                    : 'w-10 h-10'
                }`}
              >
                <div
                  className={`flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'text-[#3476DB]' : 'text-white'
                  }`}
                >
                  {sizedIcon}
                </div>
              </div>

              {/* Label - Only show when active */}
              {isActive && (
                <span className="text-white text-[11px] font-semibold font-poppins-util whitespace-nowrap">
                  {tab.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
