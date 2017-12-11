import React from 'react'

const EnrollButton = ({ oodi_url }) => (
  <div className="course-list__item__button-row">
    <div className="course-list__item__button">
      <a
        className="course-list__item__button-link"
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