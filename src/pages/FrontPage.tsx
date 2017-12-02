import * as React from 'react'
import { connect } from 'react-redux'

import { getCourses } from '../actions/course'

// import CourseTable from '../components/CourseTable'

import './FrontPage.css'
import { ChangeEvent } from 'react'

interface FrontPageProps {
  courses: any[],
  getCourses: Function
}

interface FrontPageState {
  renderedCourses: any[],
  selected: any,
  study_fields: any[]
}

class FrontPage extends React.Component<any, FrontPageState> {

  state = {
    renderedCourses: [],
    selected: {
      study_field: {
        id: 'all',
        name: 'Kaikki'
      },
      periods: [
       { name: 'Periodi I', selected: true },
       { name: 'Periodi II', selected: true },
       { name: 'Periodi III', selected: true },
       { name: 'Periodi IV', selected: true },
       { name: 'Periodi V', selected: true },
      ],
      view: 'list'
    },
    study_fields: [{
      id: 'all',
      name: 'Kaikki'
    }, {
      id: 'tkt_kandi',
      name: 'Tietojenkäsittelytieteen kandiohjelma, 2017-18'
    }, {
      id: 'tkt_maisteri',
      name: 'Tietojenkäsittelytieteen maisteriohjelma, 2017-18'
    }, {
      id: 'data_maisteri',
      name: 'Datatieteen maisteriohjelma, 2017-18'
    }],
  }

  setRenderedCourses(props: any, fieldId: String) {
    const { courses } = props
    if (fieldId === 'all') {
      // Filter duplicate courses since some courses belong to multiple study-fields
      let uniqueIds: Number[] = []
      let filteredCourses: Object[] = []
      courses.forEach((c: any) => {
        if (!uniqueIds.includes(c.id)) {
          filteredCourses.push(c)
          uniqueIds.push(c.id)
        }
      })
      this.setState({
        renderedCourses: filteredCourses,
      })
    } else {
      const filteredCourses = courses.filter((c: any) => c.study_field === fieldId)
      this.setState({
        renderedCourses: filteredCourses
      })
    }
  }

  componentDidMount() {
    this.props.getCourses()
  }

  componentWillReceiveProps(newProps: FrontPageProps) {
    this.setRenderedCourses(newProps, this.state.selected.study_field.id)
  }

  handleClick(type: String, e: Event) {
    if (type === 'selectList') {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = 'list'
      this.setState(stateChange)
    } else if (type === 'selectTable') {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = 'table'
      this.setState(stateChange)
    }
  }

  handleChange(type: String, e: ChangeEvent<HTMLSelectElement>) {
    if (type === 'selectStudyField') {
      const newField = this.state.study_fields.find((c: any) => c.id === type)
      if (newField) {
        this.setState({
          selected: {
            study_field: newField
          }
        })
      }
      this.setRenderedCourses(this.props, type)
    }
  }

  renderSearch() {
    const { study_fields } = this.state
    const { study_field } = this.state.selected
    return (
      <div className='course-search--container'>
        <div>
          <select onChange={this.handleChange.bind(this, 'selectStudyField')}
            value={study_field.name}>
          { study_fields.map(f => 
            <option key={f.id} value={f.id}>{f.name}</option>
          )}
          </select>
        </div>
      </div>
    )
  }

  renderPeriods() {
    const { periods } = this.state.selected
    return (
      <div>
        { periods.map((period, i) => 
          <button key={period.name}>{period.name}</button>
        )}
      </div>
    )
  }

  render() {
    const { renderedCourses } = this.state
    return (
      <div className='front-page--container'>
        { this.renderSearch() }
        { this.renderPeriods() }
        <div>
          <button onClick={this.handleClick.bind(this, 'selectList')}>Lista</button>
          <button onClick={this.handleClick.bind(this, 'selectTable')}>Taulukko</button>
        </div>
        <p>Kursseja yhteensä: { renderedCourses.length }</p>
        <h1 className='main-header'>Kurssimme</h1>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  courses: state.course.courses
})

const mapDispatchToProps = (dispatch: any) => ({
  getCourses() {
    dispatch(getCourses())
  }
})

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(FrontPage)