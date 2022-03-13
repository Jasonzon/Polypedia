import '../styles/Home.css';
import Header from "./Header"
import Select from "./Select"
import logo from "../assets/logo-polytech.png"

function Home({user, setUser, isConnected, setIsConnected}) {
  return (
    <div>
      <Header user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />
      <div className="Home">
        <Select />
        <h1>Bienvenue sur Polypedia</h1>
        <div className="info">
          <div>
            <p>Chaque école du réseau Polytech a son BDE (ou CDE). Ils sont mis en place chaque année après que les étudiants, généralent en PEIP1 et en 3A se soient affrontés pendant des campagnes.</p>
            <p>Du début d'année scolaire jusqu'au début des campagnes, les étudiants se rassemblent en listes allant de 10 à 70 membres, choississent un thème sur lequel il vont baser leurs campagnes, ainsi qu'une couleur et une direction artistique</p>
            <p>Ces campagnes sont très attendues car elles sont l'un des évènements associatifs les plus importants de l'école, et il est habituel de suivre aussi les campagnes d'autres villes</p>
            <p>Pour que vous puissiez retrouver les anciennes listes, leurs thèmes et leurs couleurs, afin de retrouver des élèves ou d'éviter de choisir un nom de liste qui ait déjà existé, nous les regroupons sur ce site</p>
            <p>Polypedia est l'encyclopédie des listes Polytech, les utilisateurs peuvent ajouter eux-mêmes les nouvelles listes qui apparaissent chaque année dans le réseau, et aussi rechercher celles qui ont déjà été publiés selon leur nom, thème, ville ou couleur !</p>
            <p>N'attendez pas plus longtemps et cliquez sur le bouton "listes" pour avoir un aperçu de listes présentes sur le site !</p>
          </div>
          <img className="logo-polytech" alt="logo polytech" src={logo}/>
        </div>
        <h2 className="last-list">Voici la dernière liste ajoutée :</h2>
      </div>
    </div>
  );
}

export default Home;
