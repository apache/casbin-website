import React, {useEffect, useRef, useState} from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const languages = [
  {
    name: "Golang",
    icon: "/img/langs/go-logo-1.svg",
    url: "https://github.com/casbin",
  },
  {
    name: "Java",
    icon: "/img/langs/jee-3.svg",
    url: "https://github.com/apache/casbin-jcasbin",
  },
  {
    name: "C/C++",
    icon: "/img/langs/c.svg",
    url: "https://github.com/apache/casbin-cpp",
  },
  {
    name: "Node.js",
    icon: "/img/langs/nodejs-1.svg",
    url: "https://github.com/apache/casbin-node-casbin",
  },
  {
    name: "Front-end JavaScript",
    icon: "/img/langs/logo-javascript.svg",
    url: "https://github.com/apache/casbin-casbin.js",
  },
  {
    name: "PHP",
    icon: "/img/langs/PHP-logo.svg",
    url: "https://github.com/php-casbin/php-casbin",
  },
  {
    name: "Laravel",
    icon: "/img/langs/laravel-2.svg",
    url: "https://github.com/php-casbin/laravel-authz",
  },
  {
    name: "Python",
    icon: "/img/langs/python-5.svg",
    url: "https://github.com/apache/casbin-pycasbin",
  },
  {
    name: ".NET (C#)",
    icon: "/img/langs/dotnet-logo.svg",
    url: "https://github.com/apache/casbin-Casbin.NET",
  },
  {
    name: "Delphi",
    icon: "/img/langs/delphi-2.svg",
    url: "https://github.com/casbin4d/Casbin4D",
  },
  {
    name: "Rust",
    icon: "/img/langs/rust.svg",
    url: "https://github.com/apache/casbin-rs",
  },
  {
    name: "Ruby",
    icon: "/img/langs/ruby.svg",
    url: "https://github.com/CasbinRuby/casbin-ruby",
  },
  {
    name: "Swift (Objective-C)",
    icon: "/img/langs/swift-15.svg",
    url: "https://github.com/apache/casbin-SwiftCasbin",
  },
  {
    name: "Lua (OpenResty, Kong, APISIX)",
    icon: "/img/langs/lua-5.svg",
    url: "https://github.com/apache/casbin-lua-casbin",
  },
  {
    name: "Dart (Flutter)",
    icon: "/img/langs/dart.svg",
    url: "https://github.com/apache/casbin-dart-casbin",
  },
  {
    name: "Elixir",
    icon: "/img/langs/elixir-lang-icon.svg",
    url: "https://github.com/apache/casbin-ex",
  },
  {
    name: "Cloud Native",
    displayName: "Cloud Native",
    fullName: "Cloud Native (Kubernetes, Istio, Envoy, KubeSphere)",
    icon: "/img/langs/kubernetes.svg",
    url: "/docs/cloud-native",
  },
];

export default function LanguageIntegration() {
  const [hoveredLanguage, setHoveredLanguage] = useState(null);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-carousel logic
  useEffect(() => {
    if (isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => {
        // After the last language (index 16), go to -1 (default view)
        // Then from -1, go to 0 (first language)
        if (prevIndex === languages.length - 1) {
          return -1;
        }
        return prevIndex + 1;
      });
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // Update hoveredLanguage based on currentLanguageIndex
  useEffect(() => {
    if (currentLanguageIndex >= 0 && !isPaused) {
      const language = languages[currentLanguageIndex];
      setHoveredLanguage(language.displayName || language.name);
    } else if (currentLanguageIndex === -1 && !isPaused) {
      setHoveredLanguage(null);
    }
  }, [currentLanguageIndex, isPaused]);

  const handleMouseEnter = (languageName, index) => {
    setIsPaused(true);
    setHoveredLanguage(languageName);
    setCurrentLanguageIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    // Keep the current language displayed and resume from current position
  };

  return (
    <div className={styles.languageIntegration}>
      <div className="container">
        <div className={styles.headlineContainer}>
          <h2 className={styles.headline}>
            Use Apache Casbin with <span key={hoveredLanguage || "default"} className={styles.languageName}>{hoveredLanguage || "Multiple Languages"}</span>
          </h2>
        </div>
        <div className={styles.iconGrid} onMouseLeave={handleMouseLeave}>
          {languages.map((language, index) => {
            const isSelected = currentLanguageIndex === index;
            return (
              <Link
                key={language.name}
                to={language.url}
                className={styles.iconLink}
                aria-label={language.fullName || language.name}
              >
                <div
                  className={`${styles.iconContainer} ${isSelected ? styles.iconHovered : ""}`}
                  onMouseEnter={() => handleMouseEnter(language.displayName || language.name, index)}
                >
                  <img
                    src={language.icon}
                    alt={language.fullName || language.name}
                    className={styles.icon}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
