#!/usr/bin/env python3
"""
Script de téléchargement de polices (font-family) depuis Google Fonts.

Deux modes disponibles :
1. Sans clé API (par défaut) : utilise l'endpoint CSS public de Google Fonts
   (fonts.googleapis.com/css2) pour récupérer les URLs des fichiers de police.
2. Avec clé API : utilise l'API officielle Google Fonts Developer API
   (nécessite une clé, gratuite, à obtenir sur https://console.cloud.google.com/)

Usage :
    python telecharger_fonts.py "Roboto" "Open Sans" --weights 400 700 --output ./fonts
    python telecharger_fonts.py "Roboto" --api-key VOTRE_CLE --format ttf

v2 : chaque fichier est maintenant nommé d'après sa vraie famille/poids/style
(ex: Roboto-700-normal.woff2) au lieu d'un simple numéro d'ordre. Un fichier
_reponse_google_fonts.css est aussi sauvegardé dans chaque dossier de sortie
pour permettre de vérifier soi-même le contenu réel renvoyé par Google.
"""

import argparse
import os
import re
import sys
import requests


def telecharger_sans_api(font_family, weights, output_dir, formats=("woff2",)):
    """
    Télécharge une police via l'endpoint CSS public de Google Fonts.
    Ne nécessite pas de clé API.

    Corrige le bug de la version précédente : chaque URL est maintenant associée
    à SON bloc @font-face d'origine (family, weight, style), au lieu d'être
    extraite en vrac par un regex global. Le nom de fichier reflète le poids réel.
    """
    weights_str = ";".join(str(w) for w in sorted(set(int(w) for w in weights)))
    family_param = font_family.replace(" ", "+")
    url = f"https://fonts.googleapis.com/css2?family={family_param}:wght@{weights_str}&display=swap"

    # User-Agent nécessaire pour obtenir les liens .woff2 (sinon Google renvoie du .eot)
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        )
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"[ERREUR] Impossible de récupérer '{font_family}' (code {response.status_code})")
        print(f"         URL appelée : {url}")
        return

    css_content = response.text

    dest_dir = os.path.join(output_dir, font_family.replace(" ", "_"))
    os.makedirs(dest_dir, exist_ok=True)

    # Sauvegarde du CSS brut pour pouvoir vérifier soi-même ce que Google a réellement renvoyé
    css_debug_path = os.path.join(dest_dir, "_reponse_google_fonts.css")
    with open(css_debug_path, "w", encoding="utf-8") as f:
        f.write(css_content)

    # Parsing PAR BLOC @font-face, pour associer chaque URL à sa vraie famille/poids/style
    blocs = re.findall(r"@font-face\s*\{([^}]+)\}", css_content)

    if not blocs:
        print(f"[ATTENTION] Aucune police trouvée pour '{font_family}'. Vérifiez le nom.")
        print(f"            CSS brut sauvegardé dans : {css_debug_path}")
        return

    fichiers_ok = 0
    for bloc in blocs:
        m_family = re.search(r"font-family:\s*['\"]([^'\"]+)['\"]", bloc)
        m_weight = re.search(r"font-weight:\s*(\d+)", bloc)
        m_style = re.search(r"font-style:\s*(\w+)", bloc)
        m_url = re.search(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", bloc)

        if not m_url:
            continue

        bloc_family = m_family.group(1) if m_family else font_family
        bloc_weight = m_weight.group(1) if m_weight else "unknown"
        bloc_style = m_style.group(1) if m_style else "normal"
        font_url = m_url.group(1)
        ext = font_url.split(".")[-1].split("?")[0]

        # Vérification de sécurité : la famille du bloc doit correspondre à celle demandée
        if bloc_family.lower() != font_family.lower():
            print(f"[ATTENTION] Bloc ignoré : famille '{bloc_family}' ne correspond pas à '{font_family}' demandée.")
            continue

        nom_fichier = f"{font_family.replace(' ', '_')}-{bloc_weight}-{bloc_style}.{ext}"
        file_path = os.path.join(dest_dir, nom_fichier)
        print(f"[INFO] Bloc trouvé -> famille='{bloc_family}', poids={bloc_weight}, style={bloc_style}")
        _telecharger_fichier(font_url, file_path)
        fichiers_ok += 1

    if fichiers_ok == 0:
        print(f"[ATTENTION] Aucun bloc valide n'a été téléchargé pour '{font_family}'.")
        print(f"            Inspecte le CSS brut ici : {css_debug_path}")


def telecharger_avec_api(font_family, api_key, output_dir, formats=("ttf",)):
    """
    Télécharge une police via l'API officielle Google Fonts Developer API.
    Nécessite une clé API.
    """
    meta_url = f"https://www.googleapis.com/webfonts/v1/webfonts?key={api_key}"
    response = requests.get(meta_url)
    if response.status_code != 200:
        print(f"[ERREUR] Échec de l'appel API (code {response.status_code})")
        return

    data = response.json()
    match = next((item for item in data.get("items", []) if item["family"].lower() == font_family.lower()), None)

    if not match:
        print(f"[ATTENTION] Police '{font_family}' introuvable via l'API.")
        return

    dest_dir = os.path.join(output_dir, font_family.replace(" ", "_"))
    os.makedirs(dest_dir, exist_ok=True)

    for variant, file_url in match["files"].items():
        # Les URLs de l'API sont en http, on force https
        file_url = file_url.replace("http://", "https://")
        file_path = os.path.join(dest_dir, f"{font_family.replace(' ', '_')}_{variant}.ttf")
        _telecharger_fichier(file_url, file_path)


def _telecharger_fichier(url, chemin):
    """Télécharge un fichier binaire depuis une URL et l'enregistre sur disque."""
    r = requests.get(url)
    if r.status_code == 200:
        with open(chemin, "wb") as f:
            f.write(r.content)
        print(f"[OK] {chemin}")
    else:
        print(f"[ERREUR] Échec du téléchargement : {url}")


def main():
    parser = argparse.ArgumentParser(description="Télécharge des polices Google Fonts.")
    parser.add_argument("fonts", nargs="+", help="Nom(s) des font-family à télécharger, ex: \"Roboto\" \"Open Sans\"")
    parser.add_argument("--weights", nargs="+", default=["400", "700"], help="Graisses à télécharger (ex: 400 700), utilisé sans clé API")
    parser.add_argument("--output", default="./fonts", help="Dossier de sortie (défaut: ./fonts)")
    parser.add_argument("--api-key", default=None, help="Clé API Google Fonts (optionnel)")
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)

    for font_family in args.fonts:
        print(f"\n--- Téléchargement de '{font_family}' ---")
        if args.api_key:
            telecharger_avec_api(font_family, args.api_key, args.output)
        else:
            telecharger_sans_api(font_family, args.weights, args.output)

    print("\nTerminé.")


if __name__ == "__main__":
    main()
