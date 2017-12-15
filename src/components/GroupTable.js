import React from 'react'

import '@/components/GroupTable.scss'

const groupTimeClass = (index) => {
  switch(index) {
    case 0:
      return 'date'
    case 1:
      return 'day'
    case 2:
      return 'time'
    default:
      return ''
  }
}

const GroupTable = ({ groups }) => (
  <div className="group-table">
    <div className="group-table__header">
      <div className="group__name">Nimi</div>
      <div className="group__teacher">Vetäjä</div>
      <div className="group__enrolled">Ilm.</div>
      <div className="group__maximum">Max</div>
      <div className="group__time">Pvm</div>
      <div className="group__classroom">Luokka</div>
    </div>
    {groups.map((group, i) => (
      <div key={i} className="group-table__item">
        <div className="group-table__item__inline-header">
          <div className="group__name">Nimi</div>
          <div className="group__teacher">Vetäjä</div>
          <div className="group__enrolled">Ilm.</div>
          <div className="group__maximum">Max</div>
          <div className="group__time">Ryhmät</div>
        </div>
        <div className="group-table__item__body">
          <div className="group__name">{group.group_name}</div>
          <div className="group__teacher">
            {group.group_teacher}
          </div>
          <div className="group__enrolled">
            {group.enrolled}
          </div>
          <div className="group__maximum">
            {group.enrollment_max}
          </div>
          <div className="group__schedule__container">
            {group.schedule.map((s, i) => (
              <div key={i} className="group__schedule">
                <div className="group__time--full">
                  {s.time.split(' ').map((timeChunk, i) => (
                    <div
                      key={i}
                      className={`group__time__${groupTimeClass(i)}`}
                    >
                      {timeChunk}
                    </div>
                  ))}
                </div>
                <div className="group__classroom--full">
                  {s.classroom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default GroupTable