import React, {Component} from 'react'
import t from 't-component'
import FormAsync from 'lib/site/form-async'
import Reset from './reset/component'

export default class Forgot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      errors: null,
      email: '',
      success: false
    }
    this.onSuccess = this.onSuccess.bind(this)
    this.onFail = this.onFail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.setState({success: false})
  }

  onSubmit (data) {
    this.setState({loading: true})
  }

  onSuccess (res) {
    this.setState({
      loading: false,
      success: true,
      errors: null
    })
  }

  onFail (err) {
    this.setState({loading: false, errors: err})
  }

  render () {
    return (
      <div className='form-container'>
        <div id='forgot-form'>
          <div className='title-page'>
            <div className='circle'>
              <i className='icon-envelope'></i>
            </div>
            <h1>{t('forgot.question')}</h1>
          </div>
          <p className={!this.state.success ? 'explanation-message' : 'hide'}>
            {t('forgot.explanation')}.
          </p>
          <p className={this.state.success ? 'success-message' : 'hide'}>
            {t('forgot.mail.sent')}.
          </p>
          <FormAsync
            action='/api/forgot'
            className='form'
            onSuccess={this.onSuccess.bind(this)}
            onFail={this.onFail.bind(this)}
            onSubmit={this.onSubmit.bind(this)}>
            <ul
              className={this.state.errors ? 'form-errors' : 'hide'}>
              {
                this.state.errors && this.state.errors
                  .map((error, key) => (<li key={key}>{error}</li>))
              }
            </ul>
            <div className='form-group'>
              <label htmlFor='forgot-email'>{t('signup.email')}</label>
              <input
                type='email'
                className='form-control'
                name='email'
                tabIndex={1}
                placeholder={t('forgot.mail.example')}
                required />
            </div>
            <div className='form-group'>
              <button
                className={!this.state.loading ? 'btn btn-primary btn-block' : 'hide'}
                type='submit'
                tabIndex={3}>
                {t('forgot.reset')}
              </button>
              <button
                className={this.state.loading ? 'loader-btn btn btn-block btn-default' : 'hide'}>
                <div className='loader'></div>
                {t('forgot.reset')}
              </button>
            </div>
          </FormAsync>
        </div>

      </div>
    )
  }
}
