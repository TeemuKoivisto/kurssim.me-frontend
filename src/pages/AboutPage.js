import React from 'react'
import { Link } from 'react-router-dom'

import './AboutPage.scss'

const AboutPage = () => (
  <div className="about-page__container">
    <div className="front-page__link">
      <Link to="/">Etusivu</Link>
    </div>
    <p>
      Tämän äpin rakensi Weboodin kurjuuteen kyllästyneet ja oman laitoksen kurssisivujen kankeutueen ärsyyntyneet opiskelijat, 
      jotka päättivät käyttää häx-taitojaan ihmiskunnan parantamisen eduksi. Se ei ole hirveän ihmeellinen, kuten ehkä olet huomannut 
      ja sitä voisi parantaa monellakin tapaa. Esimerkiksi ajatuksena on ollut lisätä muiden laitosten kurssisivut yhdeksi omaksi äpiksi, 
      varjo-oodiksi kuten GitHub organisaatiomme on mahtipontisesti nimetty (ja domain ostetty).
    </p>
    <p>
      Jos tunnet että voisit parantaa sovellusta esimerkiksi käyttöliittymän, bugikorjausten tai muun osalta niin mielellämme 
      otamme pull requesteja vastaan! Sovellus on hostattu AWS:n päälle ja kurssi-datan hoitaa Lambda skreipperi joka laukeaa päivän välein 
      käymään läpi Weboodin kurssisivut haluttujen linjojen osalta.
    </p>
    <div className="github-link">
      <a href="https://github.com/varjo-oodi" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
  </div>
)

export default AboutPage