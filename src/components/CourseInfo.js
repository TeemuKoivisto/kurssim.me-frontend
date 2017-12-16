import React from 'react'

import './CourseInfo.scss'

const CourseInfo = ({ format, opintoni_url, oodi_url, date, enrollmentDate, teachers }) => (
  <div className="course-info">
    <div className="course__key col--key">
      <div className="">{'Tyyppi: '}</div>
      <div className="course__course-page">
        {'Kurssisivu: '}
      </div>
      <div className="course__weboodi">
        {'Weboodi: '}
      </div>
      <div className="">{'Ajankohta: '}</div>
      <div className="">{'Ilmo: '}</div>
      <div className="">{'Opettajat: '}</div>
    </div>

    <div className="course__value col--value">
      <div className="">{format}</div>
      <div className="course__course-page">
        <a
          href={opintoni_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {opintoni_url}
        </a>
      </div>
      <div className="course__weboodi">
        <a
          href={oodi_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {oodi_url}
        </a>
      </div>
      <div className="">{date}</div>
      <div className="">{enrollmentDate}</div>
      <div className="course-teachers">{teachers.map(t =>
        <span key={t}>{t}</span>)}
      </div>
    </div>
  </div>
)

export default CourseInfo