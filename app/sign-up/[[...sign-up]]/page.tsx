import { SignUp } from '@clerk/nextjs'

export default function SignUpButton() {
  return (
    <div className='bg-slate-900 h-screen flex justify-center items-center'>
      <SignUp />
    </div>
  )
}