// components/Contact/ContactSuccess.jsx
import React from 'react';
import { CheckCircle, Home, Email, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ContactSuccess = () => {
    return (
        <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Carte de confirmation */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* En-tête avec gradient */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                                <CheckCircle className="text-white text-4xl" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Message envoyé avec succès !
                            </h1>
                            <p className="text-white/90 text-lg">
                                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                            </p>
                        </div>

                        {/* Contenu */}
                        <div className="p-8 md:p-10">
                            {/* Détails */}
                            <div className="mb-10">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-8 bg-emerald-500 rounded mr-3"></div>
                                    Ce qui se passe maintenant
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center p-6 bg-blue-50 rounded-xl">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Email className="text-blue-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-2">Email de confirmation</h3>
                                        <p className="text-gray-600 text-sm">
                                            Vous recevrez une copie de votre message par email.
                                        </p>
                                    </div>

                                    <div className="text-center p-6 bg-emerald-50 rounded-xl">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <div className="text-2xl">⏱️</div>
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-2">Temps de réponse</h3>
                                        <p className="text-gray-600 text-sm">
                                            Je réponds généralement sous <strong>24 heures</strong>.
                                        </p>
                                    </div>

                                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <div className="text-2xl">📁</div>
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-2">Suivi</h3>
                                        <p className="text-gray-600 text-sm">
                                            Conservez cet email pour référence future.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Informations importantes */}
                            <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-3 text-white text-sm">
                                        !
                                    </div>
                                    Informations importantes
                                </h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                                        <span>Vérifiez votre boîte de spam si vous ne recevez pas l'email de confirmation.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                                        <span>Pour les demandes urgentes, vous pouvez m'appeler au <strong>+223 90405200</strong>.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3"></div>
                                        <span>En attendant, découvrez mes <Link to="/projects" className="text-blue-600 hover:underline">derniers projets</Link>.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/"
                                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <Home />
                                    Retour à l'accueil
                                </Link>

                                <Link
                                    to="/contact"
                                    className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <ArrowBack />
                                    Nouveau message
                                </Link>

                                <a
                                    href="mailto:kmma.960@gmail.com"
                                    className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <Email />
                                    Email direct
                                </a>
                            </div>

                            {/* Message de remerciement */}
                            <div className="text-center mt-10 pt-6 border-t border-gray-200">
                                <p className="text-gray-500 italic">
                                    "Merci de m'avoir contacté. Je suis impatient de discuter de votre projet !"
                                </p>
                                <p className="text-gray-400 text-sm mt-2">- Konaté</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Prochaines étapes</h3>
                        <div className="relative">
                            {/* Ligne de timeline */}
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                            {/* Étapes */}
                            <div className="space-y-8 relative">
                                {/* Étape 1 */}
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4 relative z-10">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Message reçu</h4>
                                        <p className="text-gray-600 text-sm mt-1">Votre message est maintenant dans ma boîte de réception.</p>
                                    </div>
                                </div>

                                {/* Étape 2 */}
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4 relative z-10">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Examen</h4>
                                        <p className="text-gray-600 text-sm mt-1">Je vais étudier votre demande attentivement.</p>
                                    </div>
                                </div>

                                {/* Étape 3 */}
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 relative z-10">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Réponse</h4>
                                        <p className="text-gray-600 text-sm mt-1">Vous recevrez une réponse détaillée par email.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSuccess;