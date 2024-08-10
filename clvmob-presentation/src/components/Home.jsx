import './Home.css';
import logo_azl from './logo_azl.png';
import homem from './homem.png'; 

const Home = () => {
  return (
    <div className='home-container'>
      <header className='header'>
        <div className='logo'>
          <img src={logo_azl} alt='CLVimob logo' />
        </div>
        <nav className='nav'>
          <button className='button-criar'>Criar Conta</button>
          <button className='button-entrar'>Entrar</button>
        </nav>
      </header>
      <main className='main-content'>
        <div className='retangulo-cinza'></div>
        <div className='texto-pagPrincipal'>
          <h2>Um <span className='text-cor'>passo a <br /> frente</span> na gestão <br />de propriedades.</h2>
          <p>Entregue uma experiência completa para seus moradores.</p>
          <button className='criarCt-button'>Crie sua conta</button>
        </div>
        <div className='imagem-content'>
          <div className='bola-laranja'></div>
          <img src={homem} alt="homem apontando" />
        </div>
      </main>
    </div>
  );
}

export default Home;
