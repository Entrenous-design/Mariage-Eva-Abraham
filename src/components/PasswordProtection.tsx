"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PasswordProtection() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Mot de passe incorrect. Veuillez réessayer.");
        setPassword("");
        setIsLoading(false);
        return;
      }

      // Success - use router.push for faster navigation
      // The cookie is already set by the API response
      router.push("/gallery");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{ 
        backgroundColor: "#FCFAFB",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        willChange: "auto",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ backgroundColor: "#81579f" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ backgroundColor: "#9B59B6", animationDelay: "2s" }}
        ></div>
      </div>

      <Card
        className="w-full max-w-md relative z-10 shadow-xl border-2"
        style={{
          backgroundColor: "#FCFAFB",
          borderColor: "#81579f",
        }}
      >
        <CardHeader className="text-center space-y-4">
          <CardTitle
            className="text-4xl font-bold font-trajan"
            style={{ color: "#81579f" }}
          >
            💍 Mariage
          </CardTitle>
          <CardDescription
            className="text-xl font-marcellus"
            style={{ color: "#81579f" }}
          >
            Eva & Abraham
          </CardDescription>
          <p
            className="text-sm mt-4"
            style={{ color: "#9B59B6" }}
          >
            Veuillez entrer le mot de passe pour accéder à l'invitation
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium font-trajan"
                style={{ color: "#81579f" }}
              >
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-10 border-2 font-trajan"
                style={{
                  borderColor: "#9B59B6",
                  backgroundColor: "#FCFAFB",
                  color: "#81579f",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  willChange: "auto",
                }}
                autoFocus
              />
            </div>

            {error && (
              <div
                className="p-3 rounded-lg border-2"
                style={{
                  backgroundColor: "#FCFAFB",
                  borderColor: "#c53030",
                }}
              >
                <p
                  className="text-sm font-trajan"
                  style={{ color: "#c53030" }}
                >
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !password}
              className="w-full h-10 font-bold font-trajan transition-all duration-300"
              style={{
                backgroundColor: isLoading ? "#6A1B9A" : "#9B59B6",
                color: "#FCFAFB",
                border: "none",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#6A1B9A";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#9B59B6";
                }
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Vérification...
                </div>
              ) : (
                "Accéder"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
