function Login() {

  function trySubmit() {
    console.log('form working')
  }

  return (
    <div className='Login'>
      <form action={trySubmit}>

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