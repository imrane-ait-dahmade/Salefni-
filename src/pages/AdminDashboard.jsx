import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/custom/table";
import Button from "../components/custom/button";
import Input from "../components/custom/input";

export default function AdminDashboard() {
    const [demandes, setDemandes] = useState([]);
    const [filteredDemandes, setFilteredDemandes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatut, setFilterStatut] = useState("tous");
    const [sortBy, setSortBy] = useState("date_desc");
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/login");
            return;
        }
        fetchDemandes();
        fetchNotifications();
    }, [navigate]);

    const fetchDemandes = async () => {
        try {
            const response = await fetch('http://localhost:3001/demandes');
            const data = await response.json();
            setDemandes(data);
            setFilteredDemandes(data);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://localhost:3001/notifications?lu=false');
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    useEffect(() => {
        let filtered = [...demandes];

        // Filtre par recherche
        if (searchTerm) {
            filtered = filtered.filter(d =>
                d.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtre par statut
        if (filterStatut !== "tous") {
            filtered = filtered.filter(d => d.statut === filterStatut);
        }

        // Tri
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "date_desc":
                    return new Date(b.dateCreation) - new Date(a.dateCreation);
                case "date_asc":
                    return new Date(a.dateCreation) - new Date(b.dateCreation);
                case "montant_desc":
                    return parseFloat(b.simulationData.capital) - parseFloat(a.simulationData.capital);
                case "montant_asc":
                    return parseFloat(a.simulationData.capital) - parseFloat(b.simulationData.capital);
                default:
                    return 0;
            }
        });

        setFilteredDemandes(filtered);
    }, [searchTerm, filterStatut, sortBy, demandes]);

    const getStatutBadge = (statut) => {
        const styles = {
            en_attente: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
            en_cours: "bg-blue-500/20 text-blue-400 border-blue-500/50",
            acceptee: "bg-green-500/20 text-green-400 border-green-500/50",
            refusee: "bg-red-500/20 text-red-400 border-red-500/50"
        };

        const labels = {
            en_attente: "En attente",
            en_cours: "En cours",
            acceptee: "Acceptée",
            refusee: "Refusée"
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[statut]}`}>
                {labels[statut]}
            </span>
        );
    };

    const exportCSV = () => {
        const headers = ["Date", "Nom", "Prénom", "Email", "Téléphone", "Type crédit", "Montant", "Durée", "Statut", "Revenu mensuel"];
        const rows = filteredDemandes.map(d => [
            new Date(d.dateCreation).toLocaleDateString('fr-FR'),
            d.nom,
            d.prenom,
            d.email,
            d.telephone,
            d.simulationData.typeCredit,
            d.simulationData.capital,
            d.simulationData.duree,
            d.statut,
            d.revenuMensuel
        ]);

        const csv = [headers, ...rows].map(row => row.join(";")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `demandes_${Date.now()}.csv`;
        link.click();
    };

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/login");
    };

    const markNotificationRead = async (id) => {
        try {
            await fetch(`http://localhost:3001/notifications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lu: true })
            });
            fetchNotifications();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Dashboard <span className="text-[#00C896]">Admin</span>
                        </h1>
                        <p className="text-gray-400">Gestion des demandes de crédit</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button className="relative text-gray-400 hover:text-white transition-colors">
                                <span className="text-2xl">🔔</span>
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>
                        </div>
                        <Button
                            title="Déconnexion"
                            style="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2"
                            fct={handleLogout}
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">Total demandes</p>
                        <p className="text-3xl font-bold text-white">{demandes.length}</p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">En attente</p>
                        <p className="text-3xl font-bold text-yellow-400">
                            {demandes.filter(d => d.statut === "en_attente").length}
                        </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">En cours</p>
                        <p className="text-3xl font-bold text-blue-400">
                            {demandes.filter(d => d.statut === "en_cours").length}
                        </p>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">Acceptées</p>
                        <p className="text-3xl font-bold text-green-400">
                            {demandes.filter(d => d.statut === "acceptee").length}
                        </p>
                    </div>
                </div>

                {/* Filtres */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-8">
                    <div className="grid md:grid-cols-4 gap-4">
                        <Input
                            placeholder="Rechercher (nom, email...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="w-full">
                            <select
                                value={filterStatut}
                                onChange={(e) => setFilterStatut(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200"
                            >
                                <option value="tous">Tous les statuts</option>
                                <option value="en_attente">En attente</option>
                                <option value="en_cours">En cours</option>
                                <option value="acceptee">Acceptée</option>
                                <option value="refusee">Refusée</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200"
                            >
                                <option value="date_desc">Plus récent</option>
                                <option value="date_asc">Plus ancien</option>
                                <option value="montant_desc">Montant décroissant</option>
                                <option value="montant_asc">Montant croissant</option>
                            </select>
                        </div>
                        <Button
                            title="Exporter CSV"
                            style="bg-[#00C896] text-white hover:bg-[#00b085] py-2"
                            fct={exportCSV}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Demandeur</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Mensualité</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Priorité</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDemandes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan="8" className="text-center text-gray-400 py-8">
                                        Aucune demande trouvée
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredDemandes.map((demande) => (
                                    <TableRow key={demande.id}>
                                        <TableCell className="text-white">
                                            {new Date(demande.dateCreation).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="text-white font-medium">{demande.nom} {demande.prenom}</p>
                                                <p className="text-gray-400 text-xs">{demande.email}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            {demande.simulationData.typeCredit}
                                        </TableCell>
                                        <TableCell className="text-white font-semibold">
                                            {parseFloat(demande.simulationData.capital).toLocaleString()} €
                                        </TableCell>
                                        <TableCell className="text-[#00C896]">
                                            {demande.results.mensualiteTotale} €
                                        </TableCell>
                                        <TableCell>
                                            {getStatutBadge(demande.statut)}
                                        </TableCell>
                                        <TableCell>
                                            {demande.prioritaire && (
                                                <span className="text-orange-400">⭐</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/admin/demande/${demande.id}`}>
                                                <Button
                                                    title="Voir"
                                                    style="bg-[#00C896] text-white hover:bg-[#00b085] px-4 py-1 text-xs"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

