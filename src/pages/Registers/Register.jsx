import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import avatar from '../../imgs/login/avatar.svg';
import wave from '../../imgs/login/wave.png';
import bg from '../../imgs/login/bg.svg';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // флаг для отслеживания отправки кода
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false); // флаг для отслеживания подтверждения кода
  const [focused, setFocused] = useState({});
  const navigate = useNavigate();

  const handleFocus = (field) => {
    setFocused((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setFocused((prevState) => ({ ...prevState, [field]: false }));
    }
  };

  // Функция для отправки кода подтверждения
  const sendCode = async () => {
    if (!email) {
      alert('Введите email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/send-verification-code/', { email });
      if (response.status === 200) {
        setIsCodeSent(true); // Устанавливаем флаг, что код был отправлен
        alert('Код отправлен на ваш email');
      }
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
      alert('Не удалось отправить код');
    }
  };

  // Функция для проверки введенного кода
  const verifyCode = async () => {
    if (confirmationCode === '') {
      alert('Введите код подтверждения');
      return;
    }

    // Здесь можно добавить логику для проверки кода на сервере (если необходимо)
    // Если код подтвержден успешно
    setIsCodeConfirmed(true);
    alert('Код подтвержден!');
  };

  // Функция для завершения регистрации
  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || password !== confirmPassword) {
      alert('Пожалуйста, заполните все поля корректно');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register/', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (response.status === 200) {
        alert('Регистрация завершена!');
        navigate('/login'); // Перенаправление на страницу входа
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Не удалось зарегистрировать пользователя');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <img src={wave} className={styles.wave} alt="wave" />
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={bg} alt="background" />
        </div>
        <div className={styles.registerContent}>
          {!isCodeSent ? (
            // Форма для ввода данных пользователя
            <form>
              <div className={styles.avatarWrapper}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
              </div>
              <h2 className={styles.title}>Регистрация</h2>

              <div className={`${styles.inputDiv} ${focused.firstName ? styles.focus : ''}`}>
                <div className={styles.i}>
                  <i className="fas fa-user"></i>
                </div>
                <div className={styles.inputWrapper}>
                  <h5>Имя</h5>
                  <input
                    type="text"
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => handleFocus('firstName')}
                    onBlur={(e) => handleBlur('firstName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={`${styles.inputDiv} ${focused.lastName ? styles.focus : ''}`}>
                <div className={styles.i}>
                  <i className="fas fa-user"></i>
                </div>
                <div className={styles.inputWrapper}>
                  <h5>Фамилия</h5>
                  <input
                    type="text"
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => handleFocus('lastName')}
                    onBlur={(e) => handleBlur('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={`${styles.inputDiv} ${focused.email ? styles.focus : ''}`}>
                <div className={styles.i}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.inputWrapper}>
                  <h5>Email</h5>
                  <input
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    required
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
                    required
                  />
                </div>
              </div>

              <div className={`${styles.inputDiv} ${focused.confirmPassword ? styles.focus : ''}`}>
                <div className={styles.i}>
                  <i className="fas fa-lock"></i>
                </div>
                <div className={styles.inputWrapper}>
                  <h5>Подтверждение пароля</h5>
                  <input
                    type="password"
                    className={styles.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className={styles.btn}
                onClick={sendCode}  // Отправка кода при регистрации
              >
                Отправить код
              </button>
            </form>
          ) : (
            // Форма для подтверждения кода
            <form>
              <div className={styles.avatarWrapper}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
              </div>
              <h2 className={styles.title}>Подтверждение почты</h2>
              <div className={`${styles.inputDiv} ${focused.confirmationCode ? styles.focus : ''}`}>
                <div className={styles.i}>
                  <i className="fas fa-key"></i>
                </div>
                <div className={styles.inputWrapper}>
                  <h5>Введите код подтверждения</h5>
                  <input
                    type="text"
                    className={styles.input}
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    onFocus={() => handleFocus('confirmationCode')}
                    onBlur={(e) => handleBlur('confirmationCode', e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className={styles.btn}
                onClick={verifyCode}  // Проверка кода
              >
                Подтвердить
              </button>
              {isCodeConfirmed && (
                <button
                  type="button"
                  className={styles.btn}
                  onClick={handleRegister}  // Завершение регистрации
                >
                  Зарегистрироваться
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
