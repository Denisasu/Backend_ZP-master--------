import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import styles from './Login.module.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import avatar from '../../imgs/login/avatar.svg';
import wave from '../../imgs/login/wave.png';
import bg from '../../imgs/login//bg.svg';

function Login() {
  const [focused, setFocused] = useState({ email: false, password: false });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Инициализируем navigate

  const handleFocus = (field) => {
    setFocused(prevState => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field, value) => {
    if (value === "") {
      setFocused(prevState => ({ ...prevState, [field]: false }));
    }
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/register';
  };

  // const handleRegister = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/register/', { email, password });
  //     if (response.status === 200 && response.data.success) {
  //       window.location.href = '/dashboard';
  //     } else {
  //       alert('Регистрация прошла успешно!');
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при регистрации:', error);
  //     alert('Произошла ошибка при регистрации!');
  //   }
  // };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/login/', { email, password, rememberMe });
      console.log('Response:', response); // Логируем ответ от сервера для проверки
      if (response.status === 200 && response.data.message === 'Вход успешен') {
        // Переход на страницу personalacc при успешном входе
        navigate('/personalacc');
      } else {
        // Если вход неуспешен, показываем уведомление
        alert('Неверный email или пароль!');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error.response || error);
      // Преобразуем ошибку в строку
      if (error.response && error.response.data) {
        alert(`Ошибка: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Произошла ошибка при подключении к серверу. Пожалуйста, попробуйте позже.');
      }
    }
  };
  
  

  const handleForgotPassword = () => {
    // Используем navigate для перехода на страницу forgotpassword
    navigate('/forgotpassword');
  };

  return (
    <div className={styles.loginContainer}>
      <img src={wave} className={styles.wave} alt="wave" />
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={bg} alt="background" />
        </div>
        <div className={styles.loginContent}>
          <form>
            <div className={styles.avatarWrapper}>
              <img src={avatar} alt="avatar" className={styles.avatar} />
            </div>
            <h2 className={styles.title}>Вход</h2>
            
            <div className={`${styles.inputDiv} ${focused.email ? styles.focus : ''}`}>
              <div className={styles.i}>
                <i className="fas fa-user"></i>
              </div>
              <div className={styles.inputWrapper}>
                <h5>Email</h5>
                <input 
                  type="text" 
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                />
              </div>
            </div>

            <div className={`${styles.inputDiv} ${focused.password ? styles.focus : ''}`}>
              <div className={styles.i}>
                <i className="fas fa-lock"></i>
              </div>
              <div className={styles.inputWrapper}>
                <h5>Пароль</h5>
                <input 
                  type="password" 
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={(e) => handleBlur('password', e.target.value)}
                />
              </div>
            </div>

            {/* Обёртка для "Запомнить меня" и "Забыли пароль?" */}
            <div className={styles.optionsWrapper}>
              <div className={styles.checkboxWrapper}>
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
                <label htmlFor="rememberMe">Запомнить меня</label>
              </div>
              <a href="#" onClick={handleForgotPassword}>Забыли пароль?</a>
            </div>

            <div className={styles.buttonsWrapper}>
              <button type="button" className={styles.btn} onClick={handleLogin}>Войти</button>
              <p className={styles.registerLink}>
                У вас нет аккаунта? <span onClick={handleRegisterRedirect} className={styles.registerBtn}>Зарегистрироваться</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
