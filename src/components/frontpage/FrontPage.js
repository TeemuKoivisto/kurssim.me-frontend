import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCourses } from '../../actions/course'

import './FrontPage.css'

class FrontPage extends Component {

  getCourses = () => {
    this.props.getCourses()
  }

  render() {
    const { courses } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.getCourses}>Get Courses</button>
        <p>kursseja yht: { courses.length }</p>
        <h1>Kurssit</h1>
        { courses.map(course => 
          <div key={course.opintokohde.opintokohdeId}>
            { course.opetustapahtumat.length > 0 ?
              <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${course.opetustapahtumat[0].opetustapahtumaId}&html=1`}
                target="_blank"
              >
                { course.opintokohde.opintokohteenNimi }
              </a>
                :
              <a>{ course.opintokohde.opintokohteenNimi }</a>
            }

          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const course_r = state.get('course')
  return {
    courses: course_r.get('courses').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCourses() {
    dispatch(getCourses())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)