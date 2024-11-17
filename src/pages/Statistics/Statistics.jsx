import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Map, YMaps } from '@pbe/react-yandex-maps';

function Statistics() {
  const [statistics, setStatistics] = useState(null); // Состояние для хранения статистики

  useEffect(() => {
    // Запрос к серверу для получения статистики
    axios.get('http://localhost:8000/statistics/')
      .then(response => {
        console.log('Server response:', response.data); // Логируем ответ сервера для отладки
        setStatistics(response.data); // Устанавливаем статистику в состояние
      })
      .catch(error => {
        console.error('Ошибка при получении статистики:', error);
      });
  }, []);

  // Если статистика не загружена, отображаем заглушку
  if (!statistics) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6} style={{ paddingLeft: 0,  marginLeft: '-30px' }}> 
            <Row style={{ marginTop: '70px' }}>
              <Col>
                <div style={{ marginBottom: '40px', fontSize:'30px' }}>
                  <div style={{ fontWeight: '700', marginBottom: '15px' }}>Количество заявок:</div>
                  <div className='inf1-one' style={{ color: 'white' }}>{statistics.total_applications}</div>
                </div>
                <div style={{ marginBottom: '40px', fontSize:'30px' }}>
                  <div style={{ fontWeight: '700', marginBottom: '15px' }}>Количество пользователей:</div>
                  <div className='inf2-one' style={{ color: 'white' }}>{statistics.total_users}</div>
                </div>
                <div style={{ marginBottom: '40px', fontSize:'30px' }}>
                  <div style={{ fontWeight: '700', marginBottom: '15px' }}>Количество завершенных заявок:</div>
                  <div className='inf3-one' style={{ color: 'white' }}>{statistics.completed_applications}</div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <YMaps>
              <div>
                <Map defaultState={{ center: [53.346785, 83.776856], zoom: 9 }} style={{ width: '850px', height: '620px' }} />
              </div>
            </YMaps>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Statistics;
