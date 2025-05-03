import React from "react";

const Footer = () => {
  return (
    <div
      id="footer"
      className="bg-[var(--color-purple-dark)] text-[var(--color-background)] rounded-t-lg px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"
    >
      {/* Top Section */}
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between text-center gap-6 sm:gap-12 lg:gap-20">
        <div className="flex flex-col items-center flex-1">
          <span className="font-poppins text-xs sm:text-sm lg:text-base">
            ⚖️ Mentions légales
          </span>
          <hr className="w-1/3 border-t-[1px] border-[var(--color-purple-pale)] mt-2" />
          <div className="text-[10px] sm:text-xs lg:text-sm mt-2 text-center">
            Conditions d'utilisation <br />
            Propriété intellectuelle
          </div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="font-poppins text-xs sm:text-sm lg:text-base">
            🔐 Politique de confidentialité
          </span>
          <hr className="w-1/3 border-t-[1px] border-[var(--color-purple-pale)] mt-2" />
          <div className="text-[10px] sm:text-xs lg:text-sm mt-2 text-center">
            Données personnelles <br />
            Respect de la vie privée
          </div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="font-poppins text-xs sm:text-sm lg:text-base">
            📬 Contact support
          </span>
          <hr className="w-1/3 border-t-[1px] border-[var(--color-purple-pale)] mt-2" />
          <div className="text-[10px] sm:text-xs lg:text-sm mt-2 text-center">
            support@ensa-projects.ma <br />
            Problèmes techniques ? Écrivez-nous !
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-8 text-center text-[10px] sm:text-xs lg:text-sm font-poppins italic">
        Illustrations par{" "}
        <a
          href="https://www.flaticon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--color-purple-pale)] transition-all duration-300"
        >
          Flaticon
        </a>{" "}
        et{" "}
        <a
          href="https://storyset.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--color-purple-pale)] transition-all duration-300"
        >
          Storyset
        </a>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-[8px] sm:text-[10px] lg:text-xs font-thin">
        École Nationale des Sciences Appliquées © 2025 ENSA – Tous droits
        réservés.
      </div>
    </div>
  );
};

export default Footer;
