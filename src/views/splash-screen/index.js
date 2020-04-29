import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { ROUTES } from "../../constants";
import { Link } from "react-router-dom";

const SplashScreen = () => {
  const links = [
    {
      href: process.env.REACT_APP_WIZARD_LINK,
      label: "Link do aplikacji na serwerze Wizard",
    },
    {
      href: process.env.REACT_APP_REPO_LINK,
      label: "Link do repozytorium projektu na GitHub",
    },
    {
      href: process.env.REACT_APP_PROJECT_LINK,
      label: "Link do zarządzania projektem informatycznym na GitHub",
    },
    {
      href: process.env.REACT_APP_PROTOTYPE_LINK,
      label:
        "Link do interaktywnego prototypu aplikacji (hasło: " +
        process.env.REACT_APP_PROTOTYPE_PASSWORD +
        ")",
    },
  ];

  const slides = [
    {
      src: "/images/responsive.png",
      text: "Responsywność",
    },
    {
      src: "/images/home.png",
      text: "Strona główna",
    },
    {
      src: "/images/single-post.png",
      text: "Ogłoszenie",
    },
    {
      src: "/images/comments.png",
      text: "Komentarze",
    },
    {
      src: "/images/sign-in.png",
      text: "Logowanie",
    },
    {
      src: "/images/register.png",
      text: "Rejestracja",
    },
    {
      src: "/images/new-post.png",
      text: "Nowe ogłoszenie",
    },
  ];

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8} className="mb-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Text>
                <p>
                  Aplikacja <strong>{"//FIXME"}</strong> została zaprojektowana, aby
                  w sposób intuicyjny pozwolić użytkownikowi zgłaszać zauważone
                  w przestrzeni miejskiej usterki, czy problemy.
                </p>
                <p>
                  Głównym celem aplikacji jest spełnienie funkcji informacyjnej
                  oraz sprawnej komunikacji między mieszkańcami, a instytucjami
                  decyzyjnymi. Ponadto ma za zadanie scalić interesy mieszkańców
                  oraz wzbudzić w nich poczucie tożsamości z miejscem w którym
                  żyją na co dzień.
                  <br />
                  Każdy zainteresowany, może bez przeszkód przeglądać ogłoszenia
                  innych użytkowników, a po założeniu konta oraz zalogowaniu
                  dodatkowo dodawać nowe wraz ze zdjęciem, a także lajkować i
                  komentować posty.
                </p>
                <Carousel className="mb-3 text-dark">
                  {slides.map((slide) => (
                    <Carousel.Item color="black">
                      <img
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL + slide.src}
                        alt={slide.text}
                      />
                      <Carousel.Caption>
                        <h3 className="text-dark">{slide.text}</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Text>
                <p>
                  Całość jest w pełni responsywna, użytkownik może z niej
                  korzystać na urządzeniach stacjonarnych oraz mobilnych.
                  <br />
                  W projekcie zastosowano PWA - Progressive Web App (Progresywną
                  Aplikację Internetową), co umożliwia instalację aplikacji, a
                  także wpływa na szybkość działania.
                  <br />
                  Uwierzytelnianie użytkowników odbywa się poprzez użycie loginu
                  i hasła oraz z wykorzystaniem konta Google lub GitHub.
                  <br />
                  Firebase Cloud Firestore oraz Cloud Storage zostały
                  wykorzystane do synchronizacji oraz przechowywania i
                  przetwarzania danych multimedialnych.
                </p>
                <Link to={ROUTES.HOME}>Link do aplikacji na Github Page</Link>
                {links.map((link) => (
                  <a
                    className="d-block mb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SplashScreen;
