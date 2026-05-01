'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CATEGORY_OPTIONS } from '@/lib/categories'

export function CategoryFilterForm({ 
  taskRoute, 
  defaultCategory,
  buttonText = 'Apply',
  variant = 'default'
}: { 
  taskRoute: string
  defaultCategory: string
  buttonText?: string
  variant?: 'default' | 'dark' | 'profile'
}) {
  const router = useRouter()
  const [category, setCategory] = useState(defaultCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category === 'all') {
      router.push(taskRoute)
    } else {
      router.push(`${taskRoute}?category=${encodeURIComponent(category)}`)
    }
  }

  if (variant === 'dark') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 min-w-[240px] rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white backdrop-blur-md focus:border-emerald-400/50 focus:outline-none"
        >
          <option value="all" className="bg-slate-800">All categories</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug} className="bg-slate-800">{item.name}</option>
          ))}
        </select>
        <button 
          type="submit" 
          className="h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105"
        >
          {buttonText}
        </button>
      </form>
    )
  }

  if (variant === 'profile') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 min-w-[240px] rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white backdrop-blur-md focus:border-violet-400/50 focus:outline-none"
        >
          <option value="all" className="bg-slate-800">All categories</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug} className="bg-slate-800">{item.name}</option>
          ))}
        </select>
        <button 
          type="submit" 
          className="h-12 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:scale-105"
        >
          {buttonText}
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="h-11 min-w-[220px] rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950"
      >
        <option value="all">All categories</option>
        {CATEGORY_OPTIONS.map((item) => (
          <option key={item.slug} value={item.slug}>{item.name}</option>
        ))}
      </select>
      <button 
        type="submit" 
        className="h-11 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
      >
        {buttonText}
      </button>
    </form>
  )
}
