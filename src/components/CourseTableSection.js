import React, { Component } from "react"

import "./CourseTable.css"

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
      this.setState(stateChange);
    }
  }

  formatDate(start, end) {
    return end ? `${start} - ${end}` : `${start} -`
  }

  renderCourse(course) {
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
    } = course;
    const date = this.formatDate(start_date, end_date)
    const enrollmentDate = this.formatDate(
      enrollment_start_date,
      enrollment_end_date
    )

    const visibilityClass = this.state.shownCourseDetail[course.id]
      ? ""
      : "hidden"
    // const visibilityClass = this.state.shownCourseDetail[course.id] ? 'slide-in' : 'slide-out'
    // {"enrolled": 8, "enrollment_max": 99, "enrollment_start_date": "14.08.17", "enrollment_end_date": "20.10.17", "group_name": "Ryhm\u00e4 99 (Jono - jos ryhm\u00e4t ovat t\u00e4ynn\u00e4 tai ajat eiv\u00e4t sovi)", "group_teacher": "", "schedule": [{"time": "06.09.17", "classroom": ""}], "group_languages": ""}]}
    return [
      <div className="course-list__item__container">
        <div
          className="course-list__item"
          onClick={this.handleShowDetailClick.bind(this, course)}
          key={`${course.id}`}
        >
          <div className="course-list__item__name col--name">
            <h4 className="course-list__item__header">
              {/* {open ? (
                <i className="fa fa-check" aria-hidden="true" />
              ) : (
                <i className="fa fa-times" aria-hidden="true" />
              )} */}
              <span className="course-list__item__header-text">{name}</span>
              {/* <a
                className="course-list__item__header__link"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${id}&html=1`}
              >
                <i className="fa fa-external-link" aria-hidden="true" />
              </a> */}
            </h4>
          </div>
          <div className="col--date">{start_date}</div>
          <div className="col--credits">{credits}</div>
        </div>

        <div className={`course-list__item__body ${visibilityClass}`}>
          <div className="course-list__item__info">
            <div className="course-list__item__key col--key">
              <div className="course-list__item__format">{"Tyyppi: "}</div>
              <div className="course-list__item__course-page">
                {"Kurssisivu: "}
              </div>
              <div className="course-list__item__date">{"Ajankohta: "}</div>
              <div className="course-list__item__enrollment">{"Ilmo: "}</div>
              <div className="course-list__item__teachers">{"Opettajat: "}</div>
            </div>

            <div className="course-list__item__value col--value">
              <div className="">{format}</div>
              <div className="course-list__item__course-page">
                <a
                  href={opintoni_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {opintoni_url}
                </a>
              </div>
              <div className="">{date}</div>
              <div className="">{enrollmentDate}</div>
              <div className="">{teachers}</div>
            </div>
          </div>

          <div className="course-list__item__button-row">
            <div className="course-list__item__button">
              <a className="course-list__item__button-link" target="_blank" rel="noopener noreferrer" href={oodi_url}>
                {'Ilmoittaudu '}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className={`course-list__item__groups ${visibilityClass}`}>
          <div className="course-list__item__groups__header">
              <div className="course-list__item__group__name">Nimi</div>
              <div className="course-list__item__group__teacher">Vetäjä</div>
              <div className="course-list__item__group__enrolled">Ilm.</div>
              <div className="course-list__item__group__maximum">Max</div>
              <div className="course-list__item__group__time">Pvm</div>
              <div className="course-list__item__group__classroom">Luokka</div>
          </div>
          { groups.map(group =>
            <div className="course-list__item__groups__group">
              <div className="course-list__item__group__name">{group.group_name}</div>
              <div className="course-list__item__group__teacher">{group.group_teacher}</div>
              <div className="course-list__item__group__enrolled">{group.enrolled}</div>
              <div className="course-list__item__group__maximum">{group.enrollment_max}</div>
              <div className="course-list__item__groups__group__schedule__container">
              { group.schedule.map(s => 
                <div className="course-list__item__groups__group__schedule">
                  <div className="course-list__item__group__time--full">
                    {s.time.split(' ').map(timeChunk => 
                      <div className="course-list__item__group__time--chunk">{timeChunk}</div>
                    )}
                  </div>
                  <div className="course-list__item__group__classroom--full">{s.classroom}</div>
                </div>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    ]
  }

  render() {
    const { title, courses } = this.props
    return (
      <div className="course-table-section">
        <h2 className="course-table-section__header"> {title}</h2>
        <div className="course-list__container">
          <div className="course-list__header">
            <span className="col--name">Nimi</span>
            <span className="col--date">Aloituspäivä</span>
            <span className="col--credits">Nopat</span>
          </div>
          <ul className="course-list">
            {courses.map(course => this.renderCourse(course))}
          </ul>
        </div>
      </div>
    )
  }
}

export default CourseTableSection
