import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import promoImg from '../../imgs/Figurs1.png'
import Dens from '../../imgs/avtors/den.png'
import Ans from '../../imgs/avtors/an.png'
import Mash from '../../imgs/avtors/mash.png'
import Sans from '../../imgs/avtors/san.png'
import act1 from '../../imgs/act/act1.png'
import act2 from '../../imgs/act/act2.png'
import act3 from '../../imgs/act/act3.png'
import act4 from '../../imgs/act/act4.png'
import './home.css'

function Home() {
    const [setIsButtonPressed] = useState(false); // Состояние для отслеживания нажатия кнопки
    const navigate = useNavigate();

    const handleClick = () => {
        setIsButtonPressed(true); // Устанавливаем состояние нажатия кнопки в true
        setTimeout(() => {
            setIsButtonPressed(false); // Через короткое время сбрасываем состояние нажатия кнопки
            navigate('/Zayvka'); // Переходим на страницу "Заявка"
        }, 300); // Число 300 здесь представляет длительность в миллисекундах, на которую кнопка останется нажатой
    };
  return (
    <>
        <Container>
            <section className='secone'>
                <div className='secone-one'>
                    <h1>Охрана<br/>природы - это<br/> ты!</h1>
                    <Button 
                    onClick={handleClick} 
                    className='btn-title'  
                    style={{backgroundColor: '#74c780', color: '#ffffff', borderRadius: '32.5px', borderColor:'#35DB4D', width:'200px', height:'55px', fontSize: '18px'}}>Очистить природу</Button>  
                </div>
                <img src={promoImg} width={600}/>
            </section>

            <section>
                <div className='proj-md3'>
                    <h2>О проекте</h2>
                    <div className="proj3">
                        <div className="proj3-itm">
                            <p>Приложение «Защитник природы» представляет собой веб-приложение, предназначенное для сбора и систематизации информации о фактах загрязнения окружающей среды на территории всего города Барнаула.</p>
                        </div>
                        
                        <div className='proj3-img'>
                            <div className="avt1">
                                <img src={Dens} width={85}/>
                                <div className="avt1-text">
                                    <h4>Лопушанский Денис<br/>Константинович</h4>
                                    <p>Scrum-master</p>
                                </div>
                            </div>
                            <div className="avt2">
                                <img src={Ans} width={85}/>
                                <div className="avt2-text">
                                <h4>Дутова Анна Александровна</h4>
                                <p>Дизайнер</p>
                                </div>
                            </div>
                            <div className="avt3">
                                <img src={Mash} width={85}/>
                                <div className="avt3-text">
                                    <h4>Бирюк Мария Денисовна</h4>
                                    <p>Разработчик</p>
                                </div>
                            </div>
                            <div className="avt4">
                                <img src={Sans} width={85}/>
                                <div className="avt4-text">
                                    <h4>Соколов Александр Евгеньевич</h4>
                                    <p>Системный аналитик</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="aktual">
                    <h2>Актуальность</h2>
                    <div className="aktall">
                    <div className="akt1">
                        <h3>Чистота</h3>
                        <p>Берегите природу, оставляйте за собой чистоту</p>
                        <img src={act1} alt="Чистота" width={300} />
                    </div>

                    <div className="akt2">
                        <h3>Вместе</h3>
                        <p>Масса людей наша сила</p>
                        <img src={act2} alt="Чистота" width={300} />
                    </div>

                    <div className="akt3">
                        <h3>Оздоровление</h3>
                        <p>Обеспечение благоприятных условий</p>
                        <img src={act3} alt="Чистота" width={300} />
                    </div>

                    <div className="akt4">
                        <h3>Будущее</h3>
                        <p>Спасая природу, мы спасаем себя и наши будущие поколения</p>
                        <img src={act4} alt="Чистота" width={300} />
                    </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="inform">
                    <h2>Инструкция</h2>
                    <div className="infblock">
                        <div className="inf1">
                            <div className='inf1-one'>1</div>
                            <p>Перейти на страницу заполнения заявки по кнопке "Очистить природу"</p>
                        </div>

                        <div className="inf2">
                            <div className='inf2-one'>2</div>
                            <p>Сделать фотографию загрязненной местности и прикрепить ее в Вашу Заявку</p>
                        </div>

                        <div className="inf3">
                            <div className='inf3-one'>3</div>
                            <p>Ввести номер телефона и дать разрешение на получение Вашей геолокации</p>
                        </div>

                        <div className="inf4">
                            <div className='inf4-one'>4</div>
                            <p>Опишите загрязненную местность и смело нажимайте кнопку "Отправить заявку"</p>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    </>
  );
}

export default Home;
