import { useNavigate } from "react-router"

import { connect } from 'at-the-polar-module'

function Login() {
  const navigate = useNavigate()

  function login(form) {
    const username = form.get('username')
    const role = form.get('role')

    connect(username, role, () => {
      navigate('/stations')
    })
  }

  return (
    <div className='Login'>
      <form action={login}>

        {/* ROLE */}
        <fieldset>
          <legend>Who are you?</legend>

          <label htmlFor="researcher">
            <input id='researcher' name='role' value='researcher' type='radio' required />
            Researcher
          </label>

          <label htmlFor="fan">
            <input id='fan' name='role' value='fan' type='radio' required />
            Fan
          </label>

        </fieldset>

        {/* USERNAME */}
        <label htmlFor="username"> Username *</label>
        <input id="username" name="username" type="text" required />

        {/* SUBMIT */}
        <input type="submit" value='ENTER' />

      </form>
    </div>
  )
}

export default Login