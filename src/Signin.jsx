/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import useInput from './hooks/useInput';
import './style.css';

export default function Signin() {
  const { sessionStorage, localStorage } = window;
  const [isChecked, setIsChecked] = useState(false);
  const [storage, setStorage] = useState(sessionStorage);

  const checkedHandler = (_isChecked) => {
    if (_isChecked) {
      setStorage(localStorage);
    } else {
      setStorage(sessionStorage);
    }
  };

  const onChange = ({ target }) => {
    setIsChecked(!isChecked);
    checkedHandler(target.checked);
  };

  const setLogin = () => {
    storage.setItem('loginId', document.getElementById('email').value);
    storage.setItem('loginPassword', document.getElementById('password').value);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes('@'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: emailPasswordHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== '');

  let formIsValid;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const passwordInputClasses = emailPasswordHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form>
      <div className={emailInputClasses}>
        <input
          placeholder="이메일"
          type="text"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">이메일 형식이 올바르지 않습니다.</p>
        )}
      </div>
      <div className={passwordInputClasses}>
        <input
          placeholder="비밀번호"
          type="password"
          id="password"
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
        />
      </div>
      <input type="checkbox" id="auto" onChange={(e) => onChange(e)} />
      <span>자동로그인</span>
      <div className="button">
        <button
          disabled={!formIsValid}
          onClick={() => {
            setLogin();
          }}
        >
          로그인
        </button>
      </div>
      <br />
      <div className="text">
        <span>아이디 찾기 </span>
        <span> | </span>
        <span> 비밀번호 찾기</span>
      </div>
      <div className="text">회원가입</div>
    </form>
  );
}
