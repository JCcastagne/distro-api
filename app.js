//Error codes
// Internal error with signup request: {"status":"Failure: 3"}  =  Email already in system

document.addEventListener('DOMContentLoaded', () => {
  //add event listeners
  function addEventListeners () {
    document.body
      .querySelector('.authenticateUser')
      .addEventListener('click', authenticateUser)
    document.body
      .querySelector('.createRelease')
      .addEventListener('click', createRelease)
  }
  addEventListeners()

  let API_token = ''
  let current_user_id = 11112121

  const options = {
    API_ID: '1f1e2oi43qp3ca9blov3gdhg9a',
    API_KEY: '1ch5v69dp1b5053r9g2ll9ngkrt004hspp2c9bqephs27jbdrk9a',
    SSO_AUTH_TOKEN: 'OyRET57AREcfstrui',
    COMPANY_ID: '158',
    user_first_name: 'JC',
    user_last_name: 'Test',
    country: 'CA',
    user_email: 'jc-test@vuzec.com',
    user_password: 'Test1234',
    user_unique_id: current_user_id
  }

  async function connectToAPI () {
    const token = await DistroAPI.activate(
      options['API_ID'],
      options['API_KEY'],
      options['SSO_AUTH_TOKEN'],
      options['COMPANY_ID'],
      options['user_first_name'],
      options['user_last_name'],
      options['country'],
      options['user_email'],
      options['user_password'],
      options['user_unique_id']
    )

    return token
  }

  //Activation
  function authenticateUser () {
    connectToAPI().then(token => {
      if (token.access_token) {
        console.log(token)

        API_token = token.access_token

        document.body.querySelector(
          '.status'
        ).textContent = `User authenticated`
      } else {
        console.log(`Error: ${JSON.parse(token)}`)
      }
    })
  }

  //startRelease
  async function createRelease () {
    console.log('createRelease')

    let main_artists = ['artist1', 'artist2']
    let release_title = 'release title 1'

    const JSON_release_id = await DistroAPI.startRelease(
      options.SSO_AUTH_TOKEN,
      API_token,
      options.COMPANY_ID,
      current_user_id,
      main_artists,
      release_title,
      options.API_KEY
    )

    console.log(JSON_release_id)
  }
})
