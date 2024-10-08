import RegisterUserForm from '@/components/forms/register-user-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className='w-full space-y-4 md:max-w-md mx-auto'>
      <h1 className="text-lg font-bold">Complete suas informações para continuar</h1>
      <RegisterUserForm />
      <p className='text-center text-muted-foreground'>Já possui conta? <Link className='text-foreground' href='/entrar'>Entre</Link></p>

    </div>
  )
}
