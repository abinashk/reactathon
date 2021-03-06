import React from 'react';
import { Link } from 'react-router';
import { FormErrors } from './partials';
import { Center, LoginWith } from './partials/Elements';
import {
  Button,
  Input,
  ButtonInput
} from 'react-bootstrap';

import { AppActions } from '../actions/AppActions';
import { AppStore } from '../stores/AppStore';

export class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      ...AppStore.getState(),
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    AppStore.listen(this.onChange);
  }
  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }

  clearState = () => {
    this.setState({
      username: '',
      password: ''
    });
  };

  handleForgotPasswordClick = () => {
    AppActions.hideLoginModal();
  };

  handleUsernameChange = (e => this.onChange(
      {username: e.target.value})
  );
  handlePasswordChange = (e => this.onChange(
      {password: e.target.value})
  );


  validate = () => {
    var errors = [];
    var { username,
      password
      } = this.state;
    const rules = [
      {
        failOn: username.trim().length < 4,
        error: 'Username must be at least 4 characters'
      },
      {
        failOn: password.trim().length < 5,
        error: 'Password must be at least 5 characters'
      }
    ];

    rules.forEach((rule) => {

      if (rule.failOn) {
        errors.push(rule);
      }
    });

    if (errors.length) {
      return {
        errors: errors,
        valid: false
      };
    } else {
      return {
        errors: null,
        valid: true
      };
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();


    var valid = this.validate();
    if (valid.errors) {

      let article = valid.errors.length > 1 ? 'are' : 'is';
      let noun = valid.errors.length > 1 ? 'errors' : 'error';
      let count = valid.errors.length > 1 ? valid.errors.length : 'one';

      this.setState({
        error: {
          message: `There ${article} ${count} ${noun},  please try again.`,
          data: valid.errors
        }
      });
      return;
    }

    AppActions.login({
      username: this.state.username,
      password: this.state.password
    });

  };

  render() {
    // handlers
    let {
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      handleForgotPasswordClick
      } = this;
    // state
    let {
      error,
      username,
      password
      } = this.state;

    return (
      <section>
        {error ? <FormErrors {...error} /> : ''}
        <form onSubmit={handleSubmit}>
          <Center><h4>Login with social account</h4></Center>
          <hr/>
          <LoginWith github/>
          <LoginWith reddit/>
          <LoginWith google/>
          <LoginWith twitter/>
          <LoginWith facebook/>
          <LoginWith forcedotcom/>
          <Center><h4>Sign in with local account</h4></Center>
          <hr/>
          <Input disabled={this.state.loginPending}
                 type="text"
                 label="Username"
                 value={username}
                 onChange={handleUsernameChange}
                 placeholder="Enter a username" />
          <Input disabled={this.state.loginPending}
                 type="password"
                 value={password}
                 onChange={handlePasswordChange}
                 label="Password" />
          {this.state.signupPending ?
            <Button disabled>Signing up...</Button> :
            <ButtonInput bsStyle="success"
                         type="submit"
                         value="Login" />

        }
          <Link
            onClick={handleForgotPasswordClick}
            to={{
            pathname: '/reset'
          }}>
            Forgot your password?
          </Link>
        </form>
      </section>
    );
  }
}
