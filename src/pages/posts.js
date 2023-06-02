import { addPost, db, getPosts } from '../firebase';

export default () => {
  const container = document.createElement('div');

  const template = `
    <header class="geral">
      <h1 class="Techsisters">Techsisters</h1>
      <nav class="links">
        <a class="inicioA" href="#login">INÍCIO</a>
        <a class="sobreA" href="#sobre">SOBRE</a>
      </nav>  
    </header>

    <section class="feed-container" id="feed-container">
      <div class="feed-novo-post">
        <textarea class="feed-text-box" id="text-post" placeholder="Escreva aqui seu post..." name="story" rows="5" cols="33"></textarea>
        <button id="post-button">Publicar</button>
      </div>
      <div id="post-area">
        <!-- Aqui serão exibidos os posts -->
      </div>
    </section>
  `;

  container.innerHTML = template;

  const btnEnvio = container.querySelector('#post-button');
  const postArea = container.querySelector('#post-area');

  btnEnvio.addEventListener('click', async (e) => {
    const textPost = document.getElementById('text-post').value;

    if (textPost.trim() !== '') {
      const post = {
        título: 'Meu primeiro post',
        conteúdo: textPost,
      };

      try {
        await addPost(db, post);
        alert('Post adicionado com sucesso');
        document.getElementById('text-post').value = '';
        await displayPosts();
      } catch (error) {
        alert('Erro ao adicionar o post: ' + error);
      }
    }
  });

  async function displayPosts() {
    postArea.innerHTML = ''; // Limpar o conteúdo anterior

    try {
      const posts = await getPosts(db);
      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h3>${post.título}</h3>
          <p>${post.conteúdo}</p>
          <hr>
        `;
        postArea.appendChild(postElement);
      });
    } catch (error) {
      console.log('Erro ao obter os posts:', error);
    }
  }

  displayPosts(); // Exibir os posts ao carregar a página

  return container;
};
