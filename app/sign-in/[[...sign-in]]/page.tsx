import { Button } from '@/components/ui/button'
import { SignIn } from '@clerk/nextjs'

export default function SignInButton() {
  return (
    <div className='bg-slate-900 h-screen flex justify-center items-center'>
      <SignIn />
    </div>
  )
}