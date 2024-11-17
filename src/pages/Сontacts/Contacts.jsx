import React, { Component } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import './Contacts.css'; // Импортируем CSS-файл

export default class Contacts extends Component {
  state = {
    agreementChecked: false, // Состояние для отслеживания установки галочки
    isSubmitting: false, // Состояние для отслеживания отправки формы
    showSuccessAlert: false // Состояние для отображения уведомления об успешной отправке
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Проверяем, установлена ли галочка
    if (!this.state.agreementChecked) {
      return; // Прерываем выполнение функции
    }

    // Получаем значения из формы
    const phone = event.target.elements.phone.value;
    const name = event.target.elements.name.value;
    const question = event.target.elements.question.value;

    // Создаем объект с данными для отправки на сервер
    const messageData = {
      phone_number: phone,
      name: name,
      message: question
    };

    // Устанавливаем состояние "отправка формы"
    this.setState({ isSubmitting: true });

    // Отправляем данные на сервер
    try {
      const response = await fetch('http://localhost:8000/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке сообщения');
      }

      // Устанавливаем состояние "отправка формы" обратно в false после успешной отправки
      this.setState({ isSubmitting: false, showSuccessAlert: true });

      // Все прошло успешно, обновляем состояние компонента или выводим уведомление об успешной отправке
    } catch (error) {
      console.error('Ошибка:', error);
      // Обработка ошибок, например, вывод уведомления пользователю
    }
  };

  handleCheckboxChange = () => {
    this.setState({ agreementChecked: !this.state.agreementChecked });
  };

  handleCloseAlert = () => {
    this.setState({ showSuccessAlert: false });
  };

  render() {
    return (
      
      <Container className="container-custom"> {/* Добавляем собственный класс для стилизации */}
      {/* Уведомление об успешной отправке */}
      <Alert variant="success" show={this.state.showSuccessAlert} onClose={this.handleCloseAlert} dismissible style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, width: '300px', padding: '20px', textAlign: 'center' }}>
          Ваше сообщение успешно отправлено!
        </Alert>
        <div className="title-wrapper" style={{ marginBottom: "5px" }}>
          <h1>Обратная связь</h1>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="phone">
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control type="phone" placeholder="Введите номер телефона" name="phone" />
            <Form.Text>
              Мы не передаем контакты третьим лицам, эта информация необходима для связи с Вами.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Введите имя" name="name" />
          </Form.Group>

          <Form.Group controlId="question">
            <Form.Label>Ваш вопрос</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Введите ваш вопрос" name="question" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Согласен с условиями" onChange={this.handleCheckboxChange} />
          </Form.Group>

          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                variant="primary"
                type="submit"
                className={`custom-button ${this.state.isSubmitting ? 'submitting' : ''}`} // Добавляем класс 'submitting' при отправке формы
                disabled={!this.state.agreementChecked || this.state.isSubmitting} // Блокируем кнопку при отправке формы
              >
                {this.state.isSubmitting ? 'Отправка...' : 'Отправить'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
