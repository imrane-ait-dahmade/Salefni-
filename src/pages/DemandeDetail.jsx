import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../components/custom/button";
import Input from "../components/custom/input";

export default function DemandeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [demande, setDemande] = useState(null);
    const [nouvelleNote, setNouvelleNote] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/login");
            return;
        }
        fetchDemande();
    }, [id, navigate]);

    const fetchDemande = async () => {
        try {
            const response = await fetch(`http://localhost:3001/demandes/${id}`);
            const data = await response.json();
            setDemande(data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur:", error);
            setLoading(false);
        }
    };

    const updateStatut = async (nouveauStatut) => {
        try {
            const historique = demande.historique || [];
            historique.push({
                date: new Date().toISOString(),
                statut: nouveauStatut,
                par: "Admin"
            });

            await fetch(`http://localhost:3001/demandes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statut: nouveauStatut, historique })
            });
            
            fetchDemande();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const togglePriorite = async () => {
        try {
            await fetch(`http://localhost:3001/demandes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prioritaire: !demande.prioritaire })
            });
            fetchDemande();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const ajouterNote = async (e) => {
        e.preventDefault();
        if (!nouvelleNote.trim()) return;

        try {
            const notes = demande.notes || [];
            notes.push({
                date: new Date().toISOString(),
                contenu: nouvelleNote,
                auteur: "Admin"
            });

            await fetch(`http://localhost:3001/demandes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes })
            });

            setNouvelleNote("");
            fetchDemande();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <p className="text-white text-xl">Chargement...</p>
            </div>
        );
    }

    if (!demande) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <p className="text-white text-xl">Demande introuvable</p>
            </div>
        );
    }

    const getStatutColor = (statut) => {
        const colors = {
            en_attente: "bg-yellow-500",
            en_cours: "bg-blue-500",
            acceptee: "bg-green-500",
            refusee: "bg-red-500"
        };
        return colors[statut] || "bg-gray-500";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link to="/admin/dashboard" className="text-[#00C896] hover:underline mb-2 inline-block">
                            ← Retour au dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-white">
                            Demande #{demande.id}
                        </h1>
                    </div>
                    <Button
                        title={demande.prioritaire ? "⭐ Prioritaire" : "Marquer prioritaire"}
                        style={`${demande.prioritaire ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2`}
                        fct={togglePriorite}
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informations demandeur */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                            <h2 className="text-xl font-semibold text-white mb-4">Informations du demandeur</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Nom complet</p>
                                    <p className="text-white font-medium">{demande.nom} {demande.prenom}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="text-white">{demande.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Téléphone</p>
                                    <p className="text-white">{demande.telephone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Revenu mensuel</p>
                                    <p className="text-[#00C896] font-semibold">{demande.revenuMensuel} €</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Situation professionnelle</p>
                                    <p className="text-white">{demande.situationPro}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Métier</p>
                                    <p className="text-white">{demande.simulationData.metier}</p>
                                </div>
                            </div>
                            {demande.commentaire && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <p className="text-gray-400 text-sm mb-2">Commentaire</p>
                                    <p className="text-white">{demande.commentaire}</p>
                                </div>
                            )}
                        </div>

                        {/* Détails de la simulation */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                            <h2 className="text-xl font-semibold text-white mb-4">Détails du crédit</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Type de crédit</p>
                                    <p className="text-white font-medium">{demande.simulationData.typeCredit}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Montant emprunté</p>
                                    <p className="text-white font-bold text-xl">
                                        {parseFloat(demande.simulationData.capital).toLocaleString()} €
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Durée</p>
                                    <p className="text-white">{demande.simulationData.duree} ans</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Taux d'intérêt</p>
                                    <p className="text-white">{demande.simulationData.tauxAnnuel} %</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Résultats de simulation</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-gray-900/50 p-4 rounded-lg">
                                        <p className="text-gray-400 text-xs mb-1">Mensualité</p>
                                        <p className="text-white font-bold text-lg">{demande.results.mensualite} €</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg">
                                        <p className="text-gray-400 text-xs mb-1">Coût total</p>
                                        <p className="text-orange-400 font-bold text-lg">{demande.results.coutTotal} €</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg">
                                        <p className="text-gray-400 text-xs mb-1">TAEG</p>
                                        <p className="text-blue-400 font-bold text-lg">{demande.results.taeg} %</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes internes */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                            <h2 className="text-xl font-semibold text-white mb-4">Notes internes</h2>
                            
                            <form onSubmit={ajouterNote} className="mb-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={nouvelleNote}
                                        onChange={(e) => setNouvelleNote(e.target.value)}
                                        placeholder="Ajouter une note..."
                                        className="flex-1 h-10 rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200"
                                    />
                                    <Button
                                        title="Ajouter"
                                        style="bg-[#00C896] text-white hover:bg-[#00b085] px-6"
                                    />
                                </div>
                            </form>

                            <div className="space-y-3">
                                {(!demande.notes || demande.notes.length === 0) ? (
                                    <p className="text-gray-400 text-sm">Aucune note pour le moment</p>
                                ) : (
                                    demande.notes.map((note, index) => (
                                        <div key={index} className="bg-gray-900/50 p-4 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-white text-sm">{note.contenu}</p>
                                            </div>
                                            <p className="text-gray-500 text-xs">
                                                {note.auteur} - {new Date(note.date).toLocaleString('fr-FR')}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Statut */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                            <h2 className="text-xl font-semibold text-white mb-4">Statut</h2>
                            <div className="space-y-3">
                                <Button
                                    title="En attente"
                                    style={`w-full ${demande.statut === 'en_attente' ? 'bg-yellow-500' : 'bg-gray-700'} text-white hover:bg-yellow-600`}
                                    fct={() => updateStatut('en_attente')}
                                />
                                <Button
                                    title="En cours"
                                    style={`w-full ${demande.statut === 'en_cours' ? 'bg-blue-500' : 'bg-gray-700'} text-white hover:bg-blue-600`}
                                    fct={() => updateStatut('en_cours')}
                                />
                                <Button
                                    title="Acceptée"
                                    style={`w-full ${demande.statut === 'acceptee' ? 'bg-green-500' : 'bg-gray-700'} text-white hover:bg-green-600`}
                                    fct={() => updateStatut('acceptee')}
                                />
                                <Button
                                    title="Refusée"
                                    style={`w-full ${demande.statut === 'refusee' ? 'bg-red-500' : 'bg-gray-700'} text-white hover:bg-red-600`}
                                    fct={() => updateStatut('refusee')}
                                />
                            </div>
                        </div>

                        {/* Historique */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                            <h2 className="text-xl font-semibold text-white mb-4">Historique</h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full ${getStatutColor(demande.statut)} mt-2`} />
                                    <div>
                                        <p className="text-white text-sm">Créée</p>
                                        <p className="text-gray-400 text-xs">
                                            {new Date(demande.dateCreation).toLocaleString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                {demande.historique && demande.historique.map((h, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className={`w-2 h-2 rounded-full ${getStatutColor(h.statut)} mt-2`} />
                                        <div>
                                            <p className="text-white text-sm">{h.statut.replace('_', ' ')}</p>
                                            <p className="text-gray-400 text-xs">
                                                {new Date(h.date).toLocaleString('fr-FR')} - {h.par}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

