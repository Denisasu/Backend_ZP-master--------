import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ForgotPassword.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import avatar from '../../imgs/login/avatar.svg';
import wave from '../../imgs/login/wave.png';
import bg from '../../imgs/login/bg.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // Для отображения полей пароля
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

  const sendCode = async () => {
    if (!email) {
        alert('Введите email');
        return;
    }
    try {
        const response = await axios.post('http://localhost:8000/send-verification-code/', { email });
        if (response.status === 200) {
            setIsCodeSent(true);
            alert('Код отправлен на email');
        }
    } catch (error) {
        console.error('Ошибка отправки кода:', error);
        alert('Не удалось отправить код');
    }
  };

  const resetPassword = async () => {
    if (!email || !code || !newPassword || newPassword !== confirmPassword) {
        alert('Пожалуйста, заполните все поля корректно');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/reset-password/', {
            email,
            code,
            new_password: newPassword
        });

        if (response.status === 200) {
            alert('Пароль успешно сброшен');
            navigate('/login'); // Перенаправление на страницу входа
        }
    } catch (error) {
        console.error('Ошибка сброса пароля:', error);
        alert('Не удалось сбросить пароль');
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <img src={wave} className={styles.wave} alt="wave" />
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={bg} alt="background" />
        </div>
        <div className={styles.forgotPasswordContent}>
          <form>
            <div className={styles.avatarWrapper}>
              <img src={avatar} alt="avatar" className={styles.avatar} />
            </div>
            <h2 className={styles.title}>Восстановление пароля</h2>

            {/* Поле для ввода Email */}
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

            {/* Отправка кода */}
            {!isCodeSent && (
              <button
                type="button"
                className={styles.btn}
                onClick={sendCode}
              >
                Отправить код
              </button>
            )}

            {/* Поля для ввода кода и нового пароля */}
            {isCodeSent && (
              <>
                <div className={`${styles.inputDiv} ${focused.code ? styles.focus : ''}`}>
                  <div className={styles.i}>
                    <i className="fas fa-key"></i>
                  </div>
                  <div className={styles.inputWrapper}>
                    <h5>Код подтверждения</h5>
                    <input
                      type="text"
                      className={styles.input}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onFocus={() => handleFocus('code')}
                      onBlur={(e) => handleBlur('code', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={`${styles.inputDiv} ${focused.newPassword ? styles.focus : ''}`}>
                  <div className={styles.i}>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className={styles.inputWrapper}>
                    <h5>Новый пароль</h5>
                    <input
                      type="password"
                      className={styles.input}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => handleFocus('newPassword')}
                      onBlur={(e) => handleBlur('newPassword', e.target.value)}
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
                  onClick={resetPassword}
                >
                  Сбросить пароль
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
