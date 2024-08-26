import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo_azl from './logo_azl.png';
import teste from '../assets/logo_azl.png';
import homem from './homem.png'; 
import gestao from './gestaoEficiente.jpg';
import relatorio from './relatorios.jpg';
import integracao from './integração.jpg';
import imagem from './facilidadeDeUso.jpg';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleCadastroClick = () => {
        navigate('/cadastro-opcoes');
    };

    useEffect(() => {
      const carousel = document.querySelector('.carousel');
      const items = carousel.querySelectorAll('.carousel-item');
      const totalItems = items.length;

      // Clona os itens para criar a ilusão de loop infinito
      items.forEach(item => {
          const clone = item.cloneNode(true);
          carousel.appendChild(clone);
      });

      let scrollAmount = 0;
      const scrollStep = 1; // Reduz a quantidade de pixels movidos por intervalo
      const intervalTime = 30;

      const intervalId = setInterval(() => {
          scrollAmount += scrollStep;

          if (scrollAmount >= carousel.scrollWidth / 2) {
              carousel.scrollTo({ left: 0, behavior: 'auto' });
              scrollAmount = 0;
          } else {
              carousel.scrollBy({ left: scrollStep, behavior: 'auto' });
          }
      }, intervalTime); // Muda a cada 20ms para movimento suave

      return () => clearInterval(intervalId);
  }, []);

    return (
      <div>
        <header className='header'>
                <div className='logo'>
                    <img src={teste} alt='CLVimob logo' />
                </div>
                <nav className='nav'>
                    <button className='button-criar' onClick={handleCadastroClick}>Criar Conta</button>
                    <button className='button-entrar' onClick={handleLoginClick}>Entrar</button>
                </nav>
            </header> 
        <div className='home-container'>
              {/* <header className='header'>
                <div className='logo'>
                    <img src={teste} alt='CLVimob logo' />
                </div>
                <nav className='nav'>
                    <button className='button-criar' onClick={handleCadastroClick}>Criar Conta</button>
                    <button className='button-entrar' onClick={handleLoginClick}>Entrar</button>
                </nav>
            </header> */}
            <main className='main-content'>
                <div className='retangulo-cinza'></div>
                <div className='texto-pagPrincipal'>
                    <h2>Um <span className='text-cor'>passo a <br /> frente</span> na gestão <br />de propriedades</h2>
                    <p>Entregue uma experiência completa para seus moradores.</p>
                    <button className='criarCt-button' onClick={handleCadastroClick}>Crie sua conta</button>
                </div>
                <div className='imagem-content'>
                    <div className='bola-laranja'></div>
                    <img src={homem} alt="homem apontando" />
                </div>
            </main>
            <section className='carousel-section'>
                <h3>Aqui você encontra</h3>
                <div className='carousel'>
                    <div className='carousel-item'>
                        <img src={gestao} alt="Gestão Eficiente" />
                        <h4>Gestão Eficiente</h4>
                        <p>Centralize todas as informações e simplifique a gestão das suas propriedades.</p>
                    </div>
                    <div className='carousel-item'>
                        <img src={relatorio} alt="Relatórios Detalhados" />
                        <h4>Relatórios Detalhados</h4>
                        <p>Tenha acesso a relatórios completos que facilitam a tomada de decisões.</p>
                    </div>
                    <div className='carousel-item'>
                        <img src={imagem} alt="Facilidade de Uso" />
                        <h4>Facilidade de Uso</h4>
                        <p>Interface intuitiva e fácil de usar, projetada para simplificar sua experiência.</p>
                    </div>
                    <div className='carousel-item'>
                        <img src={integracao} alt="Integração Completa" />
                        <h4>Integração Completa</h4>
                        <p>Integre facilmente com outras ferramentas e sistemas que você já utiliza.</p>
                    </div>
                </div>
            </section>
            <footer className='footer'>
                <p>&copy; 2024 CLVimob. Todos os direitos reservados.</p>
                <nav className='footer-nav'>
                    <a href='#'>Sobre</a>
                    <a href='#'>Termos de Uso</a>
                    <a href='#'>Privacidade</a>
                    <a href='#'>Contato</a>
                </nav>
            </footer>
        </div>
        </div>
    );
};

export default Home;
