import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import UserContext from './context/UserContext'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/sonner"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserContext>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
              <RouterProvider  router={router}/>
        </ThemeProvider>
      </UserContext>
      <Toaster />
    </>
  )
}

export default App
