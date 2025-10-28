import AuthForm from '@/components/auth/auth-form'
import React from 'react'

function RegisterPage() {
  return (
      <div className="md:w-1/3 mx-auto">
          <AuthForm formTitle='Register' showProvider={true} footerLabel='Already have an account? Login' footerHref='/auth/login'>
                <h2>Register Form</h2>
              </AuthForm>
          </div>
  )
}

export default RegisterPage