import { Button, Card, Input, message, Tabs, TabsProps } from "antd";
import Header from "../header";
import { useState } from "react";
import { useMutation } from "react-query";
import APIRequest from "../../api/request";

export default function AuthPage() {
  const [{ username, password }, setAuth] = useState({ username: '', password: '' })
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: onAuth, isLoading } = useMutation(async ({ method }: {
    method: 'login' | 'register'
  }) => {
    const { data } = await APIRequest({
      method: 'POST',
      path: '/api/auth/' + method,
      data: { username, password }
    })
    return data
  }, {
    onSuccess: (data, { method }) => {
      if (method === 'login') {
        localStorage.setItem('token', data.token)
        window.location.reload()
      } else if (method === 'register') {
        messageApi.success('Account created successfully')
      }
    },
    onError: (err) => {
      messageApi.error('System error')
    }
  })

  const tabs: TabsProps['items'] = [
    {
      key: 'login',
      label: 'Login',
      children: (
        <form onSubmit={e => { e.preventDefault(); onAuth({ method: 'login' }) }} className="space-y-3 flex-col justify-center items-center mx-4">
          <Input addonBefore="Username" value={username} onChange={e => setAuth({ username: e.target.value, password })} />
          <Input.Password addonBefore="Password" value={password} onChange={e => setAuth({ username, password: e.target.value })} />
          <Button disabled={!username || !password} loading={isLoading} className="w-full" type="primary" htmlType="submit">Login</Button>
        </form>
      )
    },
    {
      key: 'register',
      label: 'Register',
      children: (
        <div onSubmit={e => { e.preventDefault(); onAuth({ method: 'register' }) }} className="space-y-3 flex-col justify-center items-center mx-4">
          <Input addonBefore="Username" value={username} onChange={e => setAuth({ username: e.target.value, password })} />
          <Input.Password addonBefore="Password" value={password} onChange={e => setAuth({ username, password: e.target.value })} />
          <Button disabled={!username || !password} loading={isLoading} className="w-full" type="primary" htmlType="submit">Register</Button>
        </div>
      ),
    }
  ]
  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center justify-center">
      {contextHolder}
      <Header fixed />
      <Card className="h-[15rem] w-[30rem] mt-10 shadow">
        <Tabs defaultActiveKey="login" items={tabs} centered type="card" onChange={() => setAuth({ username: '', password: '' })} />
      </Card>
    </div>
  )
}