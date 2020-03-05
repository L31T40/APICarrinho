import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);


    
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

  const url="http://www.middleware.allprint.pt/api/login";

  var userData = new FormData();
    userData.append('email', 'cenas@cenas.pt');
    userData.append('password', '12345');

    axios.post(url,userData).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
  // handle button click of login form
/*   const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  } */

  const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }



  return (
    <form>
        {/* <h3>Entrar</h3> */}

        <div className="form-group">
            <label>E-mail</label>
            <input type="email" className="form-control" placeholder="e-mail..." {...username} autoComplete="new-password" />
        </div>

        <div className="form-group">
            <label>Palavra Passe</label>
            <input type="password" className="form-control" placeholder="password......" {...password} autoComplete="new-password" />
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Lembrar-me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={<App/>}>Submeter</button>
        <p className="forgot-password text-right">
            Esqueceu a <a href="#">palavra passe?</a>
        </p>
    </form>
);
}


/* 
  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
} */

export default Login;