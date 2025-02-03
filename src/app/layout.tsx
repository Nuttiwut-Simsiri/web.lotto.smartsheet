import { Suspense } from 'react'
import { BottomNavBar } from '../components/bottom-navbar'
import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: '::: LOTTO-SMARTSHEET ::: V1.1',
  description: 'Developed by nothamkiller.eth',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" data-theme="dark">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        {children}
        <Suspense fallback={null}>
          <BottomNavBar />
        </Suspense>
        <ToastContainer position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
      </body>
    </html>
  )
}
