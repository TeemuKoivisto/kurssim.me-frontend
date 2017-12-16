import React from 'react'

const EnrollButton = ({ oodi_url }) => (
  <div className="course__btn__container">
    <div className="course__btn">
      <a
        className="course__btn__link"
        target="_blank"
        rel="noopener noreferrer"
        href={oodi_url}
      >
        {'Ilmoittaudu '}
        <i className="fa fa-angle-right" aria-hidden="true" />
      </a>
    </div>
  </div>
)

export default EnrollButton