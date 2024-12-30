'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {AlertCircle, Loader} from 'lucide-react'
import {APP_NAME} from "@/lib/AppConfig";
import {signIn} from "@/service/auth";
import {setToken} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!username || !password) {
      setError('请输入用户名与密码')
      setLoading(false)
      return
    }

    try {
      const result = await signIn(username, password)
      setToken(result.token)
      router.push('/')
    } catch (e) {
      setError('用户名或密码错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{APP_NAME}</CardTitle>
          <CardDescription> 请输入你的用户名与密码 </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username"> 用户名 </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"> 密码 </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember"> 记住我 </Label>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle size={20}/>
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader className="animate-spin"/> : '进入系统'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600">
            还没有账户？
            <a href="mailto:qnurye@gmail.com" className="text-blue-600 hover:underline">
              联系你的 Mentor
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

