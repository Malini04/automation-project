import '@/styles/globals.css'
import Nav from '@/app/components/Nav';


export const metadata = {
    title : 'Internship | Automation',
    description : 'Discover & Appply for Internship easily',
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
          <div className="main">
            <div className="gradient"/>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
      </body>
    </html>
  )
}

export default RootLayout;
