import React, { Component } from 'react'

import GroupTable from './GroupTable'
import EnrollButton from './EnrollButton'

import './CourseTableSection.scss'

class CourseTableSection extends Component {
  state = {
    shownCourseDetail: {}
  }

  handleShowDetailClick(course, e) {
    if (this.state.shownCourseDetail[course.id]) {
      const stateChange = { ...this.state }
      stateChange.shownCourseDetail[course.id] = undefined
      this.setState(stateChange)
    } else {
      const stateChange = { ...this.state }
      stateChange.shownCourseDetail[course.id] = course
      this.setState(stateChange)
    }
  }

  formatDate(start, end) {
    return end ? `${start} - ${end}` : `${start} -`
  }

  renderCourse(course, showCourse) {
    const {
      id,
      name,
      credits,
      open,
      start_date,
      end_date,
      enrollment_start_date,
      enrollment_end_date,
      opintoni_url,
      oodi_url,
      teachers,
      format,
      groups
    } = course
    const date = this.formatDate(start_date, end_date)
    const enrollmentDate = this.formatDate(
      enrollment_start_date,
      enrollment_end_date
    )

    const courseVisibility = showCourse ? '' : 'hidden'
    const courseDetailVisibility = this.state.shownCourseDetail[course.id] ? '' : 'hidden'
    // const visibilityClass = this.state.shownCourseDetail[course.id] ? 'slide-in' : 'slide-out'
    // {"enrolled": 8, "enrollment_max": 99, "enrollment_start_date": "14.08.17", "enrollment_end_date": "20.10.17", "group_name": "Ryhm\u00e4 99 (Jono - jos ryhm\u00e4t ovat t\u00e4ynn\u00e4 tai ajat eiv\u00e4t sovi)", "group_teacher": "", "schedule": [{"time": "06.09.17", "classroom": ""}], "group_languages": ""}]}
    return (
      <li key={id} className={`course__container ${courseVisibility}`}>
        <div
          className="course__title-box"
          onClick={this.handleShowDetailClick.bind(this, course)}
        >
          <div className="course__name col--name">
            <h4 className="course__header">
              <span className="course__header-text">{name}</span>
            </h4>
          </div>
          <div className="col--date">{start_date}</div>
          <div className="col--credits">{credits}</div>
          <div className="col--enrollment">
            {open ? (
              <i className="fa fa-check" aria-hidden="true" />
            ) : (
              <i className="fa fa-times" aria-hidden="true" />
            )}
          </div>
        </div>

        <div className={`course__body ${courseDetailVisibility}`}>
          <div className="course__info">
            <div className="course__key col--key">
              <div className="course__format">{'Tyyppi: '}</div>
              <div className="course__course-page">
                {'Kurssisivu: '}
              </div>
              <div className="course__weboodi">
                {'Weboodi: '}
              </div>
              <div className="course__date">{'Ajankohta: '}</div>
              <div className="course__enrollment">{'Ilmo: '}</div>
              <div className="course__teachers">{'Opettajat: '}</div>
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

          {groups.length !== 0 && (
            <GroupTable groups={groups} />
          )}

          {open && <EnrollButton oodi_url={oodi_url} />}
        </div>
      </li>
    )
  }

  render() {
    const { title, courses, shownCourseIds } = this.props

    return (
      <div className="course-table-section">
        <h2 className="course-table-section__header">{title}</h2>
        <div className="course-list__container">
          <div className="course-list__header">
            <span className="col--name">Nimi</span>
            <span className="col--date">Alkaa</span>
            <span className="col--credits">Nopat</span>
            <span className="col--enrollment">Ilmo</span>
          </div>
          <ul className="course-list">
            {courses.map(course => this.renderCourse(course, shownCourseIds.includes(course.id)))}
          </ul>
        </div>
      </div>
    )
  }
}

export default CourseTableSection
