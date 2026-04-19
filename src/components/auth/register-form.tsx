'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type RegisterFormProps = {
  actionClassName: string
  mutedClassName: string
}

export function RegisterForm({ actionClassName, mutedClassName }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signup(name, email, password)
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="register-name" className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Full name
        </Label>
        <Input
          id="register-name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Rivera"
          className="h-12 rounded-[var(--radius)] border-neutral-200 bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email" className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Email
        </Label>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="h-12 rounded-[var(--radius)] border-neutral-200 bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password" className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Password
        </Label>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-[var(--radius)] border-neutral-200 bg-white"
        />
      </div>
      <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-[var(--radius)] px-6 text-sm font-semibold disabled:opacity-60 ${actionClassName}`}>
        {isLoading ? 'Creating…' : 'Create account'}
      </button>
      <p className={`text-xs ${mutedClassName}`}>Account data is saved locally for this environment so you can explore the gallery and profile flows.</p>
    </form>
  )
}
