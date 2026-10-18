import { Business, Email, Hub, Person, Phone, Send, Shield } from '@mui/icons-material';
import { useState } from 'react';
import Headling from '../../composents/Headling/Headling';
import { BACKEND_URL } from '../../config';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    agreeTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetails('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
          message: formData.message,
          agree_terms: formData.agreeTerms,
        }),
      });

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        if (response.ok && data.success) {
          setSubmitStatus('success');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            topic: '',
            message: '',
            agreeTerms: false,
          });
        } else {
          setSubmitStatus('error');
          setErrorDetails(data.message || `Erreur ${response.status}`);
        }
      } catch (jsonError) {
        setSubmitStatus('error');
        setErrorDetails('Réponse brute du serveur invalide');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorDetails(`Erreur réseau: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 md:py-28 bg-[#0B0F19] text-gray-300 overflow-hidden border-t border-gray-900"
    >
      {/* Halos lumineux d'ambiance */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <Headling hightlight="Contact" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Une idée de projet ou une clé de collaboration ? Initialisons la connexion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* 📬 BLOC GAUCHE & CENTRE : Le Formulaire Cyber (Prend 2 colonnes) */}
          <div className="lg:col-span-2">
            <div className="border border-gray-800 bg-gray-900/40 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Ligne de statut supérieure */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6 font-mono text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Hub className="text-purple-400 animate-pulse" fontSize="small" />
                  <span>COM_CHANNEL::INIT</span>
                </div>
                <span>SECURE_SESSION_ACTIVE</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prénom & Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono tracking-wider uppercase mb-2">
                      <Person className="inline mr-2 text-blue-400" fontSize="small" />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-mono tracking-wider uppercase mb-2">
                      <Person className="inline mr-2 text-blue-400" fontSize="small" />
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                {/* Email & Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-xs font-mono tracking-wider uppercase mb-2">
                      <Email className="inline mr-2 text-blue-400" fontSize="small" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-mono tracking-wider uppercase mb-2">
                      <Phone className="inline mr-2 text-blue-400" fontSize="small" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="+223 90405200"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label className="block text-gray-400 text-xs font-mono tracking-wider uppercase mb-2">
                    <Business className="inline mr-2 text-blue-400" fontSize="small" />
                    Sujet *
                  </label>
                  <div className="relative">
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0B0F19]">
                        Sélectionnez un sujet
                      </option>
                      <option value="project" className="bg-[#0B0F19]">
                        Nouveau projet
                      </option>
                      <option value="collaboration" className="bg-[#0B0F19]">
                        Proposition de collaboration
                      </option>
                      <option value="freelance" className="bg-[#0B0F19]">
                        Mission freelance
                      </option>
                      <option value="question" className="bg-[#0B0F19]">
                        Question technique
                      </option>
                      <option value="other" className="bg-[#0B0F19]">
                        Autre
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-xs font-mono tracking-wider uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                {/* Case à cocher des conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 bg-gray-950 border-gray-800 text-blue-500 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label className="ml-3 text-gray-400 text-xs md:text-sm leading-tight cursor-pointer">
                    J'accepte que mes données soient transmises pour traiter ma demande conformément
                    à la
                    <a href="/privacy" className="text-blue-400 hover:underline ml-1 font-medium">
                      politique de confidentialité
                    </a>
                    .
                  </label>
                </div>

                {/* Messages de Statut Dynamiques insérés intelligemment au-dessus du bouton */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl font-mono text-xs text-green-400 animate-fadeIn">
                    [SUCCESS]:: Message acheminé avec succès. Indexation réseau terminée. Je vous
                    réponds très rapidement !
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl font-mono text-xs text-red-400 animate-fadeIn">
                    [ERROR]:: Failure lors du push réseau. Référence :{' '}
                    {errorDetails || 'Erreur inconnue'}. Veuillez réinitialiser ou utiliser
                    l'alternative par mail direct.
                  </div>
                )}

                {/* Bouton de Soumission */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm md:text-base rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'opacity-70 cursor-not-allowed'
                        : 'transform hover:scale-[1.01]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>SENDING_PACKETS...</span>
                      </>
                    ) : (
                      <>
                        <Send fontSize="small" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 🗃️ BLOC DROIT : Informations complémentaires Système (Prend 1 colonne) */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Carte d'accès Direct */}
            <div className="border border-gray-800 bg-gray-900/40 backdrop-blur-md rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-4 text-gray-800 pointer-events-none">
                <Shield fontSize="large" />
              </div>
              <h3 className="text-lg font-bold text-white mb-5 font-mono text-xs tracking-wider uppercase text-blue-400">
                // DIRECT_ACCESS
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    <Email fontSize="small" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                      Secure Mail
                    </p>
                    <p className="font-medium text-sm text-white select-all">kmma.960@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                    <Phone fontSize="small" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                      Com Line
                    </p>
                    <p className="font-medium text-sm text-white select-all">+223 90405200</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Noeuds Externes (Réseaux sociaux) */}
            <div className="border border-gray-800 bg-gray-900/20 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-gray-400 font-mono tracking-wider uppercase mb-4">
                // EXTERNAL_NODES
              </h3>
              <p className="text-gray-500 text-xs mb-5 font-mono">
                Suivez mes commits de production et mon fil d'actualité professionnelle.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 rounded-xl text-xs font-mono transition-all duration-300"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://github.com/geek-konate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 bg-gray-800/40 hover:bg-white text-gray-400 hover:text-[#0B0F19] border border-gray-700/60 rounded-xl text-xs font-mono transition-all duration-300"
                >
                  GITHUB
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
