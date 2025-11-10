import { useState } from "react";
import Input from "./custom/input";
import Button from "./custom/button";
import jsPDF from "jspdf";

export default function DemandeForm({ simulationData, results, onClose, onSuccess }) {
    const [demandeData, setDemandeData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        revenuMensuel: "",
        situationPro: "",
        commentaire: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDemandeData(prev => ({ ...prev, [name]: value }));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Titre
        doc.setFontSize(20);
        doc.setTextColor(0, 200, 150);
        doc.text("Salfni - Demande de Crédit", 105, 20, { align: "center" });
        
        // Ligne de séparation
        doc.setDrawColor(0, 200, 150);
        doc.line(20, 25, 190, 25);
        
        // Informations personnelles
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Informations personnelles", 20, 35);
        
        doc.setFontSize(10);
        doc.text(`Nom: ${demandeData.nom} ${demandeData.prenom}`, 20, 45);
        doc.text(`Email: ${demandeData.email}`, 20, 52);
        doc.text(`Téléphone: ${demandeData.telephone}`, 20, 59);
        doc.text(`Revenu mensuel: ${demandeData.revenuMensuel} €`, 20, 66);
        doc.text(`Situation professionnelle: ${demandeData.situationPro}`, 20, 73);
        
        // Détails de la simulation
        doc.setFontSize(14);
        doc.text("Détails du crédit simulé", 20, 90);
        
        doc.setFontSize(10);
        doc.text(`Type de crédit: ${simulationData.typeCredit}`, 20, 100);
        doc.text(`Métier: ${simulationData.metier}`, 20, 107);
        doc.text(`Montant emprunté: ${simulationData.capital} €`, 20, 114);
        doc.text(`Durée: ${simulationData.duree} ans`, 20, 121);
        doc.text(`Taux d'intérêt: ${simulationData.tauxAnnuel} %`, 20, 128);
        
        // Résultats
        doc.setFontSize(14);
        doc.text("Résultats de la simulation", 20, 145);
        
        doc.setFontSize(10);
        doc.text(`Mensualité: ${results.mensualite} €`, 20, 155);
        doc.text(`Mensualité totale (avec assurance): ${results.mensualiteTotale} €`, 20, 162);
        doc.text(`Coût total du crédit: ${results.coutTotal} €`, 20, 169);
        doc.text(`TAEG: ${results.taeg} %`, 20, 176);
        doc.text(`Montant total à rembourser: ${results.montantTotal} €`, 20, 183);
        
        // Commentaire
        if (demandeData.commentaire) {
            doc.setFontSize(14);
            doc.text("Commentaire", 20, 200);
            doc.setFontSize(10);
            const splitComment = doc.splitTextToSize(demandeData.commentaire, 170);
            doc.text(splitComment, 20, 210);
        }
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 285, { align: "center" });
        
        // Télécharger le PDF
        doc.save(`demande_credit_${demandeData.nom}_${Date.now()}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const demande = {
            ...demandeData,
            simulationData,
            results,
            statut: "en_attente",
            dateCreation: new Date().toISOString(),
            prioritaire: false,
            notes: []
        };

        try {
            // Enregistrer la demande
            const response = await fetch('http://localhost:3001/demandes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(demande)
            });

            const createdDemande = await response.json();

            // Créer une notification pour l'admin
            await fetch('http://localhost:3001/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "nouvelle_demande",
                    demandeId: createdDemande.id,
                    message: `Nouvelle demande de ${demandeData.nom} ${demandeData.prenom}`,
                    date: new Date().toISOString(),
                    lu: false
                })
            });

            // Générer le PDF
            generatePDF();

            setIsSubmitting(false);
            onSuccess();
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Demande de crédit</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            label="Nom *"
                            type="text"
                            name="nom"
                            placeholder="Votre nom"
                            value={demandeData.nom}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Prénom *"
                            type="text"
                            name="prenom"
                            placeholder="Votre prénom"
                            value={demandeData.prenom}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        label="Email *"
                        type="email"
                        name="email"
                        placeholder="votre.email@exemple.com"
                        value={demandeData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Téléphone *"
                        type="tel"
                        name="telephone"
                        placeholder="06 12 34 56 78"
                        value={demandeData.telephone}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Revenu mensuel (€) *"
                        type="number"
                        name="revenuMensuel"
                        placeholder="3000"
                        value={demandeData.revenuMensuel}
                        onChange={handleChange}
                        required
                    />

                    <div className="w-full">
                        <label htmlFor="situationPro" className="block text-sm font-medium text-gray-300 mb-2">
                            Situation professionnelle *
                        </label>
                        <select
                            id="situationPro"
                            name="situationPro"
                            value={demandeData.situationPro}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200"
                            required
                        >
                            <option value="">Sélectionnez...</option>
                            <option value="cdi">CDI</option>
                            <option value="cdd">CDD</option>
                            <option value="independant">Indépendant</option>
                            <option value="fonctionnaire">Fonctionnaire</option>
                            <option value="retraite">Retraité</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="commentaire" className="block text-sm font-medium text-gray-300 mb-2">
                            Commentaire (optionnel)
                        </label>
                        <textarea
                            id="commentaire"
                            name="commentaire"
                            value={demandeData.commentaire}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Informations complémentaires..."
                            className="flex w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 resize-none"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            title={isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                            style="bg-[#00C896] text-white hover:bg-[#00b085] flex-1 py-3"
                            disabled={isSubmitting}
                        />
                        <Button
                            title="Annuler"
                            style="bg-gray-700 text-white hover:bg-gray-600 px-8 py-3"
                            fct={(e) => {
                                e.preventDefault();
                                onClose();
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

