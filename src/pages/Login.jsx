import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/custom/input";
import Button from "../components/custom/button";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/users?email=${credentials.email}&password=${credentials.password}`);
            const users = await response.json();

            if (users.length > 0 && users[0].role === "admin") {
                localStorage.setItem("admin", JSON.stringify(users[0]));
                navigate("/admin/dashboard");
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (error) {
            setError("Erreur de connexion. Veuillez réessayer.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-2 text-center">
                    Espace <span className="text-[#00C896]">Admin</span>
                </h1>
                <p className="text-gray-400 text-center mb-8">Connectez-vous pour gérer les demandes</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="admin@salfni.com"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Mot de passe"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        title="Se connecter"
                        style="bg-[#00C896] text-white hover:bg-[#00b085] w-full py-3 mt-6"
                    />
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    Démo : admin@salfni.com / admin123
                </p>
            </div>
        </div>
    );
}

