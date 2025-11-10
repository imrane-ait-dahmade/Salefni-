import { useState } from "react";
import Input from "../components/custom/input";
import Button from "../components/custom/button";
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/custom/table";

export default function Simulation() {
    const [formData, setFormData] = useState({
        capital: "",
        duree: "",
        tauxAnnuel: "",
        tauxAssurance: "",
        fraisFixes: ""
    });

    const [results, setResults] = useState(null);
    const [amortissement, setAmortissement] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculerSimulation = (e) => {
        e.preventDefault();

        const capital = parseFloat(formData.capital);
        const dureeAnnees = parseFloat(formData.duree);
        const tauxAnnuel = parseFloat(formData.tauxAnnuel);
        const tauxAssurance = parseFloat(formData.tauxAssurance) || 0;
        const fraisFixes = parseFloat(formData.fraisFixes) || 0;

        // Validation
        if (!capital || !dureeAnnees || !tauxAnnuel) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        // Calculs
        const n = dureeAnnees * 12; // nombre de mois
        const t = tauxAnnuel / 12 / 100; // taux mensuel

        // Mensualité (formule classique)
        const mensualite = (capital * t) / (1 - Math.pow(1 + t, -n));

        // Assurance mensuelle
        const assuranceMensuelle = (capital * tauxAssurance) / 100 / 12;
        
        // Assurance totale
        const assuranceTotale = assuranceMensuelle * n;

        // Mensualité totale (avec assurance)
        const mensualiteTotale = mensualite + assuranceMensuelle;

        // Coût total
        const coutTotal = (mensualite * n) + fraisFixes + assuranceTotale - capital;

        // TAEG simplifié
        const taeg = (coutTotal / (capital * dureeAnnees)) * 100;

        // Tableau d'amortissement
        let capitalRestant = capital;
        const tableauAmortissement = [];

        for (let mois = 1; mois <= n; mois++) {
            const interets = capitalRestant * t;
            const principal = mensualite - interets;
            capitalRestant -= principal;

            // Enregistrer seulement certains mois pour ne pas surcharger
            if (mois === 1 || mois % 12 === 0 || mois === n) {
                tableauAmortissement.push({
                    mois,
                    mensualite: mensualite.toFixed(2),
                    principal: principal.toFixed(2),
                    interets: interets.toFixed(2),
                    assurance: assuranceMensuelle.toFixed(2),
                    capitalRestant: Math.max(0, capitalRestant).toFixed(2)
                });
            }
        }

        setResults({
            mensualite: mensualite.toFixed(2),
            mensualiteTotale: mensualiteTotale.toFixed(2),
            assuranceMensuelle: assuranceMensuelle.toFixed(2),
            coutTotal: coutTotal.toFixed(2),
            taeg: taeg.toFixed(2),
            montantTotal: ((mensualite * n) + fraisFixes + assuranceTotale).toFixed(2)
        });

        setAmortissement(tableauAmortissement);

        // Sauvegarde dans json-server (optionnel)
        sauvegarderSimulation({
            date: new Date().toISOString(),
            donnees: formData,
            resultats: results
        });
    };

    const sauvegarderSimulation = async (data) => {
        try {
            await fetch('http://localhost:3001/simulations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("Erreur de sauvegarde:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Simulation de <span className="text-[#00C896]">Crédit</span>
                </h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Formulaire */}
                    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-6">Vos informations</h2>
                        <form onSubmit={calculerSimulation} className="space-y-4">
                            <Input
                                label="Montant emprunté (€) *"
                                type="number"
                                name="capital"
                                placeholder="150000"
                                value={formData.capital}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Durée du prêt (années) *"
                                type="number"
                                name="duree"
                                placeholder="20"
                                value={formData.duree}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Taux d'intérêt annuel (%) *"
                                type="number"
                                step="0.01"
                                name="tauxAnnuel"
                                placeholder="1.5"
                                value={formData.tauxAnnuel}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Taux d'assurance annuel (%)"
                                type="number"
                                step="0.01"
                                name="tauxAssurance"
                                placeholder="0.36"
                                value={formData.tauxAssurance}
                                onChange={handleChange}
                            />
                            <Input
                                label="Frais de dossier (€)"
                                type="number"
                                name="fraisFixes"
                                placeholder="1000"
                                value={formData.fraisFixes}
                                onChange={handleChange}
                            />
                            <Button
                                title="Calculer"
                                style="bg-[#00C896] text-white hover:bg-[#00b085] w-full py-3 mt-6"
                            />
                        </form>
                    </div>

                    {/* Résultats */}
                    {results && (
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                            <h2 className="text-2xl font-semibold text-white mb-6">Résultats</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-gray-400 text-sm">Mensualité (hors assurance)</p>
                                    <p className="text-3xl font-bold text-white">{results.mensualite} €</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-gray-400 text-sm">Mensualité totale (avec assurance)</p>
                                    <p className="text-2xl font-bold text-[#00C896]">{results.mensualiteTotale} €</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900/50 p-4 rounded-lg">
                                        <p className="text-gray-400 text-sm">Coût total du crédit</p>
                                        <p className="text-xl font-bold text-white">{results.coutTotal} €</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg">
                                        <p className="text-gray-400 text-sm">TAEG</p>
                                        <p className="text-xl font-bold text-white">{results.taeg} %</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-gray-400 text-sm">Montant total à rembourser</p>
                                    <p className="text-2xl font-bold text-orange-400">{results.montantTotal} €</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <p className="text-gray-400 text-sm">Assurance mensuelle</p>
                                    <p className="text-lg font-semibold text-white">{results.assuranceMensuelle} €</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tableau d'amortissement */}
                {amortissement.length > 0 && (
                    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-6">Tableau d'amortissement</h2>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-gray-300">Mois</TableHead>
                                        <TableHead className="text-gray-300">Mensualité</TableHead>
                                        <TableHead className="text-gray-300">Principal</TableHead>
                                        <TableHead className="text-gray-300">Intérêts</TableHead>
                                        <TableHead className="text-gray-300">Assurance</TableHead>
                                        <TableHead className="text-gray-300">Capital restant</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {amortissement.map((ligne, index) => (
                                        <TableRow key={index} className="hover:bg-gray-700/50">
                                            <TableCell className="text-white font-medium">{ligne.mois}</TableCell>
                                            <TableCell className="text-gray-300">{ligne.mensualite} €</TableCell>
                                            <TableCell className="text-[#00C896]">{ligne.principal} €</TableCell>
                                            <TableCell className="text-orange-400">{ligne.interets} €</TableCell>
                                            <TableCell className="text-blue-400">{ligne.assurance} €</TableCell>
                                            <TableCell className="text-white font-semibold">{ligne.capitalRestant} €</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}