"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabase"
import { Button } from "./ui/button"

export default function LoginButton() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  if (user) return null // ✅ Hide the button if user is logged in

  return (
    <Button
      onClick={handleLogin}
      className="px-6 py-2 text-sm font-semibold shadow">
    
      Sign in with Google
    </Button>
  )
}
