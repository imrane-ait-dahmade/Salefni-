import { Link } from 'react-router-dom';
import Button from '../components/custom/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00C896]/20 text-[#00C896] text-sm font-medium mb-6">
            ✨ Bienvenue sur Salfni
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Gérez vos <span className="text-[#00C896]">simulations</span>
            <br />
            en toute simplicité
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Salfni vous permet de créer et gérer vos simulations de manière intuitive. 
            Profitez d'une interface moderne et performante pour tous vos besoins.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/simulation">
              <Button
                title="Commencer la simulation"
                style="bg-[#00C896] text-white hover:bg-[#00b085] shadow-lg shadow-[#00C896]/30 px-8 py-3"
              />
            </Link>
            <Button
              title="En savoir plus"
              style="bg-gray-800 text-white border-2 border-gray-700 hover:border-gray-600 px-8 py-3"
              fct={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>

      {/* Section Caractéristiques */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Pourquoi choisir Salfni ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:bg-gray-800/70 border border-gray-700">
              <div className="w-12 h-12 bg-[#00C896]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rapide</h3>
              <p className="text-gray-300">
                Créez vos simulations en quelques clics avec notre interface optimisée.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:bg-gray-800/70 border border-gray-700">
              <div className="w-12 h-12 bg-[#00C896]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Intuitif</h3>
              <p className="text-gray-300">
                Une interface moderne et facile à utiliser pour tous les utilisateurs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:bg-gray-800/70 border border-gray-700">
              <div className="w-12 h-12 bg-[#00C896]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sécurisé</h3>
              <p className="text-gray-300">
                Vos données sont protégées avec les meilleurs standards de sécurité.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}