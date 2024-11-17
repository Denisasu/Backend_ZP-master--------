import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Image, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Импорт Link для перехода на другую страницу
import mesto from './mesto.png'; // Убедитесь, что путь к изображению указан правильно
import './Zayvka.css'; // Импортируйте CSS файл

function Zayvka() {
    const [image, setImage] = useState(null);
    const [phone, setPhone] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отслеживания отправки заявки
    const [showAlert, setShowAlert] = useState(false); // Состояние для отслеживания видимости уведомления

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLongitude(longitude.toFixed(4));
            setLatitude(latitude.toFixed(4));
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); // Установка состояния "отправка заявки"

        if (!image) {
            console.error('Файл изображения не выбран');
            setIsSubmitting(false); // Сброс состояния "отправка заявки" в случае ошибки
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1]; // Извлекаем base64-строку из Data URL

            const applicationData = {
                photo: base64Image,
                phone_number: phone,
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude),
                description: description
            };

            try {
                const response = await axios.post('http://localhost:8000/applications/', applicationData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Заявка успешно отправлена:', response.data);
                setIsSubmitting(false); // Сброс состояния "отправка заявки" после успешной отправки
                setShowAlert(true); // Показываем уведомление об успешной отправке
                // Сбрасываем форму после успешной отправки
                setImage(null);
                setPhone('');
                setDescription('');
            } catch (error) {
                console.error('Ошибка при отправке заявки:', error);
                setIsSubmitting(false); // Сброс состояния "отправка заявки" в случае ошибки
            }
        };
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Закрываем уведомление
    };

    return (
        <div className="form-container">
            {/* Всплывающее уведомление об успешной отправке */}
            <Alert variant="success" show={showAlert} onClose={handleCloseAlert} dismissible style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, width: '300px', padding: '20px', textAlign: 'center' }}>
                Заявка успешно отправлена!
                Ваша заявка очень важна для нас, вместе мы очистим природу от мусора!
            </Alert>

            <Form onSubmit={handleSubmit} style={{ width: '450px' }}>
                <h2 className="form-header">Заявка</h2>
                <Form.Group controlId="image">
                    <Form.Label>Загрузить фотографию</Form.Label>
                    <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                </Form.Group>
                {image && (
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                        <Image src={URL.createObjectURL(image)} fluid style={{ maxWidth: '50px', height: 'auto' }} />
                    </div>
                )}

                <Form.Group controlId="Phone">
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control type="phone" placeholder="Введите номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="longitude">
                    <Form.Label>Долгота</Form.Label>
                    <Form.Control type="text" value={longitude} readOnly className="location-border" />
                </Form.Group>

                <Form.Group controlId="latitude">
                    <Form.Label>Широта</Form.Label>
                    <Form.Control type="text" value={latitude} readOnly className="location-border" />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control as="textarea" placeholder="Введите описание заявки" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button 
                        variant="primary" 
                        type="submit"
                        className={`custom-button ${isSubmitting ? 'submitting' : ''}`} // Добавляем класс 'submitting' при отправке заявки
                        disabled={isSubmitting || !phone || !longitude || !latitude || !description || !image} // Блокируем кнопку при отправке заявки или если есть пустые поля
                    >
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Zayvka;
