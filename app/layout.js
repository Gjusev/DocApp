"use client"
import  Navigation  from "./components/Navigation"
import '../styles/globals.css'
import{AuthContextProvider} from './context/AuthContext'

const metadata = {
  title: 'DocApp v1',
  description: 'Codded by: Mokka',
}
export default function RootLayout({ children }) {
 return (
    <html >
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        
        <AuthContextProvider>
        <Navigation />
          {children}
        </AuthContextProvider>
       
      </body>
    </html>
  )
}
