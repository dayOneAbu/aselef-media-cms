import React from 'react'

export const Error: React.FC<{
  message?: string
}> = ({ message }) => {
  return (
    <div className="text-brand-dark bg-brand-light/10 border border-brand-dark rounded px-3 py-2 mt-2 text-sm">
      {message || 'This field is required'}
    </div>
  )
}
